import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IChangePointMutationData {
    changePoint?: IPoint;
}

export interface IChangePointMutationVariables {
    item: IPointChangeInputIO;
}

export class ChangePointMutation extends Mutation<IChangePointMutationData, IChangePointMutationVariables> {
}

export const useChangePointMutation = (mutation: DocumentNode, options?: MutationHookOptions<IChangePointMutationData, IChangePointMutationVariables>) => (
    useMutation<IChangePointMutationData, IChangePointMutationVariables>(
        mutation,
        options
    )
)