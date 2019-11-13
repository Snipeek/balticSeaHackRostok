import {APOLLO_QUERY_RESULT, APOLLO_MUTATION_RESULT} from "apollo-link-redux";
import {getInitialState} from "@/redusers/getInitialState";

const initialState: IStoreGraphql = getInitialState("graphql", {
    user: undefined,
});

export interface IStoreGraphql {
    user?: IProfile;
}

export default function graphql(store: IStoreGraphql = initialState, action: any): IStoreGraphql {
    switch (action.type) {
        case APOLLO_QUERY_RESULT:
            switch (action.operationName) {
                case "profile":
                    if (action.result && action.result.data && action.result.data && action.result.data.profile !== store.user) {
                        return Object.assign({}, store, {user: action.result.data.profile});
                    }
                    break;
                }
            break;
        case APOLLO_MUTATION_RESULT:
            if (action.operationName === "logout" && action.result && action.result.data && action.result.data.logout) {
                return Object.assign({}, store, {user: undefined});
            }
            break;
    }
    return store;
}
