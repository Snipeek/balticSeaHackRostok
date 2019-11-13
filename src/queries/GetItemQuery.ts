import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetItemQueryData {
    getItem?: IItem;
}

export interface IGetItemQueryVariables {
    id?: number;
}

export class GetItemQuery extends Query<IGetItemQueryData, IGetItemQueryVariables> {
}

export const useGetItemQuery = (query: DocumentNode, options?: QueryHookOptions<IGetItemQueryData, IGetItemQueryVariables>) => (
    useQuery<IGetItemQueryData, IGetItemQueryVariables>(
        query,
        options
    )
)