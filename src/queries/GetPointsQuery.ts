import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetPointsQueryData {
    getPoints?: IPoint[];
}

export class GetPointsQuery extends Query<IGetPointsQueryData> {
}

export const useGetPointsQuery = (query: DocumentNode, options?: QueryHookOptions<IGetPointsQueryData>) => (
    useQuery<IGetPointsQueryData>(
        query,
        options
    )
)