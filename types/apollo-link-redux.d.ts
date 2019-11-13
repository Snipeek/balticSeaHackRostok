declare module "apollo-link-redux" {
    import {ApolloLink} from "apollo-link";
    export const APOLLO_QUERY_INIT: string;
    export const APOLLO_QUERY_RESULT: string;
    export const APOLLO_MUTATION_INIT: string;
    export const APOLLO_MUTATION_RESULT: string;
    export const APOLLO_SUBSCRIPTION_INIT: string;
    export const APOLLO_SUBSCRIPTION_RESULT: string;

    export default class ReduxLink extends ApolloLink {
        constructor(store: any)
    }
}
