import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IFakeMutationMutationData {
    fakeMutation?: boolean;
}

export class FakeMutationMutation extends Mutation<IFakeMutationMutationData> {
}

export const useFakeMutationMutation = (mutation: DocumentNode, options?: MutationHookOptions<IFakeMutationMutationData>) => (
    useMutation<IFakeMutationMutationData>(
        mutation,
        options
    )
)