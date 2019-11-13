const fs = require("fs");
const clientSchema = require("./client-schema.json");
const serverSchema = require("./server-schema.json");


let serverSchemaQuery,
	serverSchemaMutation,
	clientSchemaQuery,
	clientSchemaMutation;
let serverSchemaTypes = serverSchema.data.__schema.types;
let clientSchemaTypes = clientSchema.data.__schema.types;

for (let i = 0; i < serverSchemaTypes.length; i++) {
	console.log(serverSchema.data.__schema.mutationType);
	if (serverSchemaTypes[i].name === serverSchema.data.__schema.queryType.name) {
		serverSchemaQuery = serverSchemaTypes[i];
		continue;
	}
	if (serverSchemaTypes[i].name === serverSchema.data.__schema.mutationType.name) {
		serverSchemaMutation = serverSchemaTypes[i];
	}
}

for (let i = 0; i < clientSchema.data.__schema.directives.length ; i++) {
	if(clientSchema.data.__schema.directives[i].name === 'client'){
		serverSchema.data.__schema.directives.push(clientSchema.data.__schema.directives[i]);
	}
}



for (let i = 0; i < clientSchemaTypes.length; i++) {
	let type = clientSchemaTypes[i];
	if (type.kind === "OBJECT"
		&& type.name[0] !== "_"
		&& type.name !== clientSchema.data.__schema.queryType.name
		&& type.name !== clientSchema.data.__schema.mutationType.name
	) {
		serverSchemaTypes.push(type);
	} else if (type.name === clientSchema.data.__schema.queryType.name) {
		clientSchemaQuery = type;
	} else if (type.name === clientSchema.data.__schema.mutationType.name) {
		clientSchemaMutation = type;
	}
}

if (clientSchemaQuery) {
	clientSchemaQuery.fields.map(field => {
		serverSchemaQuery.fields.push(field);
	});
}

if (clientSchemaMutation) {
	clientSchemaMutation.fields.map(field => {
		serverSchemaMutation.fields.push(field);
	});
}

fs.writeFileSync("./graphql.schema.json", JSON.stringify(serverSchema, null, 2), "utf-8");






