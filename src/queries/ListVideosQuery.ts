import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IListVideosQueryData {
    listVideos?: IVideosPage;
}

export interface IListVideosQueryVariables {
    pageSize?: number;
    page?: number;
}

/**
 * Дефолтное значение pageSize - 20
 * Дефолтное значние page - 0
 */
export class ListVideosQuery extends Query<IListVideosQueryData, IListVideosQueryVariables> {
}

export const useListVideosQuery = (query: DocumentNode, options?: QueryHookOptions<IListVideosQueryData, IListVideosQueryVariables>) => (
    useQuery<IListVideosQueryData, IListVideosQueryVariables>(
        query,
        options
    )
)