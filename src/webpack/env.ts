interface IEnvVariables {
   [name: string]: any;
}
export const getEnvVariables = (names: string[]): IEnvVariables => {
    const result: IEnvVariables = {};
    names.forEach(name => {
       result[name] = JSON.stringify(process.env[name]);
    });
    return result;
};
