import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IFindVideoQueryData {
    findVideo?: IVideo;
}

export interface IFindVideoQueryVariables {
    videoId: number;
}

export class FindVideoQuery extends Query<IFindVideoQueryData, IFindVideoQueryVariables> {
}

export const useFindVideoQuery = (query: DocumentNode, options?: QueryHookOptions<IFindVideoQueryData, IFindVideoQueryVariables>) => (
    useQuery<IFindVideoQueryData, IFindVideoQueryVariables>(
        query,
        options
    )
)