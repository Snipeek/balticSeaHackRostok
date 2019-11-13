import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IAdminQueryData {
    admin?: IAdmin;
}

export interface IAdminQueryVariables {
    adminId: number;
}

export class AdminQuery extends Query<IAdminQueryData, IAdminQueryVariables> {
}

export const useAdminQuery = (query: DocumentNode, options?: QueryHookOptions<IAdminQueryData, IAdminQueryVariables>) => (
    useQuery<IAdminQueryData, IAdminQueryVariables>(
        query,
        options
    )
)