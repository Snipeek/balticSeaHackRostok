import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface ITagSuggestQueryData {
    tagSuggest?: ITag[];
}

export interface ITagSuggestQueryVariables {
    search?: string;
}

export class TagSuggestQuery extends Query<ITagSuggestQueryData, ITagSuggestQueryVariables> {
}

export const useTagSuggestQuery = (query: DocumentNode, options?: QueryHookOptions<ITagSuggestQueryData, ITagSuggestQueryVariables>) => (
    useQuery<ITagSuggestQueryData, ITagSuggestQueryVariables>(
        query,
        options
    )
)