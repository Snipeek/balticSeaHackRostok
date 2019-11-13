import * as fs from "fs";

export class Logger {
    constructor() {
        if (SERVER) {
            if (!fs.existsSync("temp")) {
                fs.mkdirSync("temp");
            }
        }
    }

    public info(message: any, inFile?: string) {
        this.message("info", message, inFile);
    }

    public error(message: any, inFile?: string) {
        this.message("error", message, inFile);
    }

    public warning(message: any, inFile?: string) {
        this.message("warning", message, inFile);
    }

    protected message(type: string, message: any, inFile?: string) {

        let resultMessage: string = "";
        if (typeof message === "object") {
            resultMessage = JSON.stringify(message, null, 2);
        } else {
            resultMessage = "" + message;
        }
        inFile = inFile || "";
        const date = (new Date()).toLocaleString();
        if (SERVER) {
            fs.appendFileSync(`temp/app${(new Date()).toLocaleDateString().replace(/[\\/]/g, "_")}.log`, `${date} [${type}] ${inFile} ${resultMessage} \n\n`);
        } else {
            console.log(`${date} [${type}] ${resultMessage} \n\n`);
        }

    }
}

export const logger = new Logger();
