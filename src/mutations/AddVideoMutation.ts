import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IAddVideoMutationData {
    addVideo?: boolean;
}

export interface IAddVideoMutationVariables {
    url: string;
}

export class AddVideoMutation extends Mutation<IAddVideoMutationData, IAddVideoMutationVariables> {
}

export const useAddVideoMutation = (mutation: DocumentNode, options?: MutationHookOptions<IAddVideoMutationData, IAddVideoMutationVariables>) => (
    useMutation<IAddVideoMutationData, IAddVideoMutationVariables>(
        mutation,
        options
    )
)