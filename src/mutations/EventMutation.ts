import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IEventMutationData {
    event?: IReturnEvent;
}

export interface IEventMutationVariables {
    create?: IInputCreateEventIO;
    update?: IInputUpdateEventIO;
    delete?: number[];
}

export class EventMutation extends Mutation<IEventMutationData, IEventMutationVariables> {
}

export const useEventMutation = (mutation: DocumentNode, options?: MutationHookOptions<IEventMutationData, IEventMutationVariables>) => (
    useMutation<IEventMutationData, IEventMutationVariables>(
        mutation,
        options
    )
)