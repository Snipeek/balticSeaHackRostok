import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetPointQueryData {
    getPoint?: IPoint;
}

export interface IGetPointQueryVariables {
    id?: number;
}

export class GetPointQuery extends Query<IGetPointQueryData, IGetPointQueryVariables> {
}

export const useGetPointQuery = (query: DocumentNode, options?: QueryHookOptions<IGetPointQueryData, IGetPointQueryVariables>) => (
    useQuery<IGetPointQueryData, IGetPointQueryVariables>(
        query,
        options
    )
)