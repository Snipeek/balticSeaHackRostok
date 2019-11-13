import {GraphQLError} from "graphql";

export function getRedirect(graphQLErrors: ReadonlyArray<GraphQLError>): string {
    let result = "";
    graphQLErrors.forEach(e => {
        if ((e as any).code && (e as any).code === 301) {
            result = e.message;
        }
    });
    return result;
}
