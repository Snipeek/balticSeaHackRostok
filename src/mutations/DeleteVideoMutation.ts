import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IDeleteVideoMutationData {
    deleteVideo?: boolean;
}

export interface IDeleteVideoMutationVariables {
    id: number;
}

export class DeleteVideoMutation extends Mutation<IDeleteVideoMutationData, IDeleteVideoMutationVariables> {
}

export const useDeleteVideoMutation = (mutation: DocumentNode, options?: MutationHookOptions<IDeleteVideoMutationData, IDeleteVideoMutationVariables>) => (
    useMutation<IDeleteVideoMutationData, IDeleteVideoMutationVariables>(
        mutation,
        options
    )
)