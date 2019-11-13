import {Query} from "react-apollo";

import {QueryHookOptions, useQuery} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IProfileQueryData {
    profile?: IProfile;
}

export class ProfileQuery extends Query<IProfileQueryData> {
}

export const useProfileQuery = (query: DocumentNode, options?: QueryHookOptions<IProfileQueryData>) => (
    useQuery<IProfileQueryData>(
        query,
        options
    )
)