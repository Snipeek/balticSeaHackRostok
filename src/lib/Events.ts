type EventCallback = (...args: any) => any;

export class Events {
    protected events: { [name: string]: EventCallback[] };
    protected eventPrefix = "";

    constructor() {
        this.events = {};
    }

    public on(eventName: string, callback: EventCallback) {
        if (!this.events[this.eventPrefix + eventName]) {
            this.events[this.eventPrefix + eventName] = [];
        }
        this.events[this.eventPrefix + eventName].push(callback);
    }

    public off(eventName: string, callback: EventCallback) {
        if (this.events[this.eventPrefix + eventName]) {
            this.events[this.eventPrefix + eventName] = this.events[this.eventPrefix + eventName].filter(callbackItem => {
                return callbackItem !== callback;
            });
        }
    }

    public trigger(eventName: string, ...args: any) {
        if (this.events[this.eventPrefix + eventName]) {
            this.events[this.eventPrefix + eventName].forEach(callback => {
                callback.call(null, ...args);
            });
        }
    }
}

export const event = new Events();
