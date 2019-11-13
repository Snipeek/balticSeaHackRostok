import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetEventsQueryData {
    getEvents?: IEvent[];
}

export class GetEventsQuery extends Query<IGetEventsQueryData> {
}

export const useGetEventsQuery = (query: DocumentNode, options?: QueryHookOptions<IGetEventsQueryData>) => (
    useQuery<IGetEventsQueryData>(
        query,
        options
    )
)