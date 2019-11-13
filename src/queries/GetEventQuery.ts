import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IGetEventQueryData {
    getEvent?: IEvent;
}

export interface IGetEventQueryVariables {
    id: number;
}

export class GetEventQuery extends Query<IGetEventQueryData, IGetEventQueryVariables> {
}

export const useGetEventQuery = (query: DocumentNode, options?: QueryHookOptions<IGetEventQueryData, IGetEventQueryVariables>) => (
    useQuery<IGetEventQueryData, IGetEventQueryVariables>(
        query,
        options
    )
)