import {Events} from "@/lib/Events";

const storageName = "rvg-storage";

export class Storage extends Events {
    protected eventPrefix = storageName + "-";
    private storage: { [name: string]: any } | null;

    constructor() {
        super();
        this.storage = null;
    }

    public getItem(name: string, defaultValue: any = null): any {
        if (!this.storage) {
            this.readStorage();
        }
        if (this.storage) {
            return this.storage[name];
        }
        return defaultValue;
    }

    public setItem(name: string, value: any, saveInStorage = true): any {
        if (!this.storage) {
            this.readStorage();
        }
        if (this.storage) {
            this.storage[name] = value;
            if (saveInStorage) {
                this.writeStorage();
            }
            this.trigger(name, value);
        }
    }

    protected readStorage() {
        if (!SERVER) {
            const ls = localStorage.getItem(storageName);
            if (ls) {
                this.storage = JSON.parse(ls);
            }

        }
        if (!this.storage) {
            this.storage = {};
        }
    }

    protected writeStorage() {
        if (!SERVER && this.storage) {
            localStorage.setItem(storageName, JSON.stringify(this.storage));
        }
    }
}

export const storage = new Storage();
