const fs = require("fs");
const schema = require("./graphql.schema.json");
const _ = require('lodash');
const queryTemplate = _.template(fs.readFileSync('./graphql/templates/Query.tmpl', 'utf-8'));
const mutationTemplate = _.template(fs.readFileSync('./graphql/templates/Mutation.tmpl', 'utf-8'));


const capitalize = (str) => {
	return str[0].toUpperCase() + str.substr(1);
};

const parseName = (sourceName) => {
	let name = sourceName.replace(/Type$/, '');
	name = snakeToCamel(name);
	return name[0].toLowerCase() + name.substr(1);
};

const getInterfaceName = (name) => {
	name = parseName(name);
	return "I" + capitalize(name);
};

const scalarTypeToBaseType = (type) => {
	switch (type) {
		case "ID":
		case "Int":
		case "Float":
			return "number";
		case "String":
			return "string";
		case "Boolean":
			return "boolean";
	}
};

const scalarTypeToValue = (type) => {
	switch (type) {
		case "ID":
		case "Int":
		case "Float":
			return 0;
		case "String":
			return '""';
		case "Boolean":
			return true;
	}
};

function snakeToCamel(s) {
	return s.replace(/(_\w)/g, function (m) {
		return m[1].toUpperCase();
	});
}

const parseFieldType = (type, level = 0) => {
	let content = "";
	if(level === 0){
		content += isNonNull(type) ? ": " : "?: ";
	}
	if (type.kind === "SCALAR") {
		content += scalarTypeToBaseType(type.name);
	} else if (type.kind === "OBJECT") {
		content += getInterfaceName(type.name);
	} else if (type.kind === "NON_NULL") {
		content += parseFieldType(type.ofType, level + 1);
	} else if (type.kind === "LIST") {
		content += parseFieldType(type.ofType, level + 1) + "[]"
	} else if (type.kind === "INPUT_OBJECT"){
		//content += (level ? "" : "?: ") + "I" + capitalize(type.name);
		content += getInterfaceName(type.name) + "IO";
	}
	return content;
};

const importsForType = {};

const parseFieldValue = (type, parentType) => {
	if (type.kind === "SCALAR") {
		return scalarTypeToValue(type.name);
	} else if (type.kind === "OBJECT") {
		const name = parseName(type.name);
		if(!importsForType[parentType.name]){
			importsForType[parentType.name] = [];
		}
		importsForType[parentType.name].push(name);
		return name+"Mock";
	} else if (type.kind === "NON_NULL") {
		return parseFieldValue(type.ofType, parentType);
	} else if (type.kind === "LIST") {
		return `[${parseFieldValue(type.ofType, parentType)}]`;
	}
	return false;
}

const isNonNull = (type) => {
	if (type.kind === "SCALAR") {
		return false;
	} else if (type.kind === "OBJECT") {
		return false;
	} else if (type.kind === "NON_NULL") {
		return true;
	} else if (type.kind === "LIST") {
		return isNonNull(type.ofType);
	} else if (type.kind === "INPUT_OBJECT"){
		return false;
	}
}
const types = {};
schema.data.__schema.types.map(type => {
	if ((type.kind === "OBJECT" || type.kind === "INPUT_OBJECT") && type.name[0] !== "_" && type.name !== schema.data.__schema.mutationType.name && type.name !== schema.data.__schema.queryType.name) {
		const name = parseName(type.name);
		const suffix = type.kind === "OBJECT" ? "" : "IO";
		const fields = type.kind === "OBJECT" ? type.fields : type.inputFields;
		let content = "interface " + getInterfaceName(type.name) + suffix + " {\n";
		fields.map(field => {
			content += "    " + field.name;
			content += parseFieldType(field.type);
			content += ";";
			if (field.description) {
				content += " // " + field.description;
			}
			content += "\n";
		});
		content += "}\n";
		fs.writeFileSync("./types/" + name + suffix + ".d.ts", content);
	//	console.log("generated: ./types/" + name + ".d.ts\n")
	}
});

schema.data.__schema.types.map(type => {
	if ((type.kind === "OBJECT" || type.kind === "INPUT_OBJECT") && type.name[0] !== "_" && type.name !== schema.data.__schema.mutationType.name && type.name !== schema.data.__schema.queryType.name) {
		const name = parseName(type.name);

		const fields = type.kind === "OBJECT" ? type.fields : type.inputFields;
		const suffix = type.kind === "OBJECT" ? "" : "IO";
		if(getInterfaceName(type.name) === "IResumeLanguageUpdate"){
			console.log(suffix, type);
		}
		let content = `const ${name + suffix}Mock: ${getInterfaceName(type.name) + suffix} = {\n`;
		fields.map(field => {
			const value = parseFieldValue(field.type, type);
			if(value !== undefined && `${name}Mock` !== value) {
				if(field.name === value) {
					content += `    ${value},`;
				} else {
					content += "    " + field.name;
					content += `: ${value},`;
				}
				content += "\n";

			}
		});
		let importContent = "";
		if(importsForType[type.name]){
			importsForType[type.name].forEach(name => {
				if(importContent.indexOf(`${name}Mock`) === -1 && (content.indexOf(`${name}Mock,`) !== -1 || content.indexOf(`${name}Mock],`) !== -1)) {
					importContent += `import ${name}Mock from "./${name}";\n`
				}
				if(importContent.indexOf(`${name}IOMock`) === -1 && (content.indexOf(`${name}IOMock,`) !== -1 || content.indexOf(`${name}IOMock],`) !== -1)) {
					importContent += `import ${name}IOMock from "./${name}IO";\n`
				}
			});
		}
		content += "};\n\n" + `export default ${name + suffix}Mock;\n`;
		if(importContent){
			content = importContent + "\n" + content;
		}
		fs.writeFileSync("./src/mockTypes/" + name + suffix + ".ts", content);
	//	console.log("generated: ./src/mockTypes/" + name + ".ts\n")
	}
});

let Query = _.findIndex(schema.data.__schema.types, (item) => {
	return item.name === schema.data.__schema.queryType.name;
});

Query = schema.data.__schema.types[Query];

if (Query) {
	Query.fields.forEach((field) => {
		let renderData = {
			name: field.name,
			description: field.description.replace('\n', '\n * ').trim(),
			className: capitalize(field.name),
			args: null,
			dataName: field.name,
			dataType: parseFieldType(field.type),
		};


		if(field.args && field.args.length){
			renderData.args = [];
			field.args.forEach((arg) => {
				renderData.args.push({
					name: arg.name,
					type: parseFieldType(arg.type)
				});
			});
		}

		fs.writeFileSync("./src/queries/" + renderData.className + "Query.ts", queryTemplate(renderData) , 'utf8');
	//	console.log("generated: ./src/queries/" + renderData.className + "Query.ts\n");

	});
}

let Mutation = _.findIndex(schema.data.__schema.types, (item) => {
	return item.name === schema.data.__schema.mutationType.name;
});

Mutation = schema.data.__schema.types[Mutation];

if (Mutation) {
	Mutation.fields.forEach((field) => {
		let renderData = {
			name: field.name,
			description: field.description.replace('\n', '\n * ').trim(),
			className: capitalize(field.name),
			args: null,
			dataName: field.name,
			dataType: parseFieldType(field.type),
		};


		if(field.args && field.args.length){
			renderData.args = [];
			field.args.forEach((arg) => {
				renderData.args.push({
					name: arg.name,
					type: parseFieldType(arg.type)
				});
			});
		}
		fs.writeFileSync("./src/mutations/" + renderData.className + "Mutation.ts", mutationTemplate(renderData) , 'utf8');
	//	console.log("generated: ./src/mutations/" + renderData.className + "Mutation.ts\n");

	});
}






