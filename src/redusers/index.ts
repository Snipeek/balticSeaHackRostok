import {AnyAction, applyMiddleware, combineReducers, createStore, Reducer, Store} from "redux";
import graphql, {IStoreGraphql} from "./graphql";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {storage} from "@/lib/Storage";
import form, {IStoreForm} from "@/redusers/form";
import seo, {IRouteSeo} from "@/redusers/seo";
import theme, {themeMode} from "@/redusers/theme";
import map, {IMapState} from '@/redusers/map';

export interface IStore {
    graphql: IStoreGraphql;
    form: IStoreForm;
    seo: IRouteSeo;
    map: IMapState;
    theme: themeMode;
}

const rootReduser: Reducer<IStore, AnyAction> = combineReducers({
    graphql,
    form,
    seo,
    map,
    theme,
});

export const createAppStore = () => {
    return createStore(rootReduser, composeWithDevTools(applyMiddleware(thunk)));
};

export const getStore = (): Store<IStore, AnyAction> & {
    dispatch: {},
} => {
    return storage.getItem("store");
};
