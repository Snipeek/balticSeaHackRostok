import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IIncrementCountMutationData {
    IncrementCount?: IIncrementCount;
}

export class IncrementCountMutation extends Mutation<IIncrementCountMutationData> {
}

export const useIncrementCountMutation = (mutation: DocumentNode, options: MutationHookOptions<IIncrementCountMutationData>) => (
    useMutation<IIncrementCountMutationData>(
        mutation,
        options
    )
)