import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IStateQueryData {
    state?: IState;
}

export class StateQuery extends Query<IStateQueryData> {
}

export const useStateQuery = (query: DocumentNode, options: QueryHookOptions<IStateQueryData>) => (
    useQuery<IStateQueryData>(
        mutation,
        options
    )
)