import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IRemovePointMutationData {
    removePoint?: boolean;
}

export interface IRemovePointMutationVariables {
    pointId: number;
}

export class RemovePointMutation extends Mutation<IRemovePointMutationData, IRemovePointMutationVariables> {
}

export const useRemovePointMutation = (mutation: DocumentNode, options?: MutationHookOptions<IRemovePointMutationData, IRemovePointMutationVariables>) => (
    useMutation<IRemovePointMutationData, IRemovePointMutationVariables>(
        mutation,
        options
    )
)