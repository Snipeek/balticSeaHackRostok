import {IStore} from "@/redusers/index";

export function getInitialState<S>(name: keyof IStore, defaultState: S): S {
    if (SERVER) {
        return defaultState;
    } else {
        const store: IStore = (window as any).__REDUX_STORE__;
        if (store && store[name]) {
            return store[name] as S;
        }
        return defaultState;
    }
}
