import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IUseCookieApproveMutationData {
    useCookieApprove?: IUseCookieApprove;
}

export class UseCookieApproveMutation extends Mutation<IUseCookieApproveMutationData> {
}

export const useUseCookieApproveMutation = (mutation: DocumentNode, options: MutationHookOptions<IUseCookieApproveMutationData>) => (
    useMutation<IUseCookieApproveMutationData>(
        mutation,
        options
    )
)