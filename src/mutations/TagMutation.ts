import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface ITagMutationData {
    tag?: IReturnTag;
}

export interface ITagMutationVariables {
    create?: IInputCreateTagIO;
    update?: IInputUpdateTagIO;
    delete?: number[];
}

export class TagMutation extends Mutation<ITagMutationData, ITagMutationVariables> {
}

export const useTagMutation = (mutation: DocumentNode, options?: MutationHookOptions<ITagMutationData, ITagMutationVariables>) => (
    useMutation<ITagMutationData, ITagMutationVariables>(
        mutation,
        options
    )
)