import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetItemsQueryData {
    getItems?: IItem[];
}

export class GetItemsQuery extends Query<IGetItemsQueryData> {
}

export const useGetItemsQuery = (query: DocumentNode, options?: QueryHookOptions<IGetItemsQueryData>) => (
    useQuery<IGetItemsQueryData>(
        query,
        options
    )
)