import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface ICompanyRegistrationMutationData {
    companyRegistration?: boolean;
}

export interface ICompanyRegistrationMutationVariables {
    request: IRegisterCompanyInputIO;
}

export class CompanyRegistrationMutation extends Mutation<ICompanyRegistrationMutationData, ICompanyRegistrationMutationVariables> {
}

export const useCompanyRegistrationMutation = (mutation: DocumentNode, options?: MutationHookOptions<ICompanyRegistrationMutationData, ICompanyRegistrationMutationVariables>) => (
    useMutation<ICompanyRegistrationMutationData, ICompanyRegistrationMutationVariables>(
        mutation,
        options
    )
)