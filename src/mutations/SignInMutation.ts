import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface ISignInMutationData {
    signIn?: string;
}

export interface ISignInMutationVariables {
    credentials: ICredentialsIO;
    rememberMe?: boolean;
}

export class SignInMutation extends Mutation<ISignInMutationData, ISignInMutationVariables> {
}

export const useSignInMutation = (mutation: DocumentNode, options?: MutationHookOptions<ISignInMutationData, ISignInMutationVariables>) => (
    useMutation<ISignInMutationData, ISignInMutationVariables>(
        mutation,
        options
    )
)