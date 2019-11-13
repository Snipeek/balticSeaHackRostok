export const asignParams = (path: string, params: { [name: string]: string | number }): string => {
    const pathParams = path.match(/:[a-z?]+/gi);
    let result = path.replace(/[?()]/g, "");
    Object.keys(params).forEach(key => {
        if (path.indexOf(":" + key) !== -1 || path.indexOf(":" + key + "?") !== -1) {
            result = result.replace(":" + key, params[key] + "");
        } else if (key !== "_search") {
            console.error(`The param ${key} not supported in the route ${path}`);
        }
    });
    if (pathParams) {
        pathParams.forEach(pathParam => {
            if (pathParam.indexOf("?") !== -1) {
                result = result.replace("/" + pathParam.replace("?", ""), "");
            }
        });
        const notMatchParams = result.match(/:[a-z]+/gi);
        if (notMatchParams && notMatchParams.length) {
            console.error(`you not set required params ${notMatchParams.toString()}`);
        }
    }
    if (result[result.length - 1] === "/") {
       result = result.substring(0, result.length - 1);
    }
    if (params._search) {
        result += `?${params._search}`;
    }
    return result;
};
