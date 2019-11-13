import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IAddPointMutationData {
    addPoint?: IPoint;
}

export interface IAddPointMutationVariables {
    item: IPointInputIO;
}

export class AddPointMutation extends Mutation<IAddPointMutationData, IAddPointMutationVariables> {
}

export const useAddPointMutation = (mutation: DocumentNode, options?: MutationHookOptions<IAddPointMutationData, IAddPointMutationVariables>) => (
    useMutation<IAddPointMutationData, IAddPointMutationVariables>(
        mutation,
        options
    )
)