import {storage} from "@/lib/Storage";
import {urlParamsToObject} from "@/helpers/url";

export class Cookie {
    protected cookie: { [name: string]: string } = {};

    constructor() {
        this.cookiesParse();
    }

    public set(name: string, value: any) {
        console.log("SET COOKIE", this.cookie, name, value);
        this.cookie[name] = value;
        this.save();
    }

    public get(name: string, defaultValue: any = null) {
        if (this.cookie[name] !== undefined) {
            return this.cookie[name];
        }
        return defaultValue;
    }

    public getAll() {
        return this.cookie;
    }

    protected cookiesParse() {
        if (SERVER) {
            const context = storage.getItem("ctx");
            this.cookie = this.serverCookieParse(context.request.header.cookie);
            console.log("SERVER COOKIE", this.cookie);
        } else {
            this.cookie = urlParamsToObject("?" + document.cookie);
            console.log("CLIENT COOKIE", this.cookie);
        }
    }

    protected save() {
        if (SERVER) {
            const context = storage.getItem("ctx");
            context.response.header.cookie = this.cookie;
            console.log("SERVER COOKIE", this.cookie);
        } else {

            const cookie = Object.keys(this.cookie).map(key => {
               return `${key}=${this.cookie[key]}`;
            });
            document.cookie = cookie.join(" ; ");
            console.log("CLIENT COOKIE", this.cookie);
        }
    }

    protected serverCookieParse(serverCookie: string) {
        const result: {[name: string]: string} = {};
        if (serverCookie) {
            serverCookie.split(";").forEach(item => {
                const values = item.trim().split("=");
                if (values.length > 1) {
                    result[values[0]] = values[1];
                }
            });
        }
        return result;
    }
}

let cookie: Cookie | null = null;

export default function getCookie(): Cookie {
    if (!cookie) {
        cookie = new Cookie();
    }
    return cookie;
}
