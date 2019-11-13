import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IRequestCodeMutationData {
    requestCode?: boolean;
}

export interface IRequestCodeMutationVariables {
    email: string;
}

export class RequestCodeMutation extends Mutation<IRequestCodeMutationData, IRequestCodeMutationVariables> {
}

export const useRequestCodeMutation = (mutation: DocumentNode, options?: MutationHookOptions<IRequestCodeMutationData, IRequestCodeMutationVariables>) => (
    useMutation<IRequestCodeMutationData, IRequestCodeMutationVariables>(
        mutation,
        options
    )
)