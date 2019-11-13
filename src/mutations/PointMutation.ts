import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IPointMutationData {
    point?: IReturnPoint;
}

export interface IPointMutationVariables {
    create?: IInputCreatePointIO;
    update?: IInputUpdatePointIO;
    delete?: number[];
}

export class PointMutation extends Mutation<IPointMutationData, IPointMutationVariables> {
}

export const usePointMutation = (mutation: DocumentNode, options?: MutationHookOptions<IPointMutationData, IPointMutationVariables>) => (
    useMutation<IPointMutationData, IPointMutationVariables>(
        mutation,
        options
    )
)