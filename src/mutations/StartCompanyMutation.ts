import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IStartCompanyMutationData {
    startCompany?: boolean;
}

export interface IStartCompanyMutationVariables {
    videoId: number;
}

export class StartCompanyMutation extends Mutation<IStartCompanyMutationData, IStartCompanyMutationVariables> {
}

export const useStartCompanyMutation = (mutation: DocumentNode, options?: MutationHookOptions<IStartCompanyMutationData, IStartCompanyMutationVariables>) => (
    useMutation<IStartCompanyMutationData, IStartCompanyMutationVariables>(
        mutation,
        options
    )
)