import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface IItemMutationData {
    item?: IReturnItem;
}

export interface IItemMutationVariables {
    create?: IInputCreateItemIO;
    update?: IInputUpdateItemIO;
    delete?: number[];
}

export class ItemMutation extends Mutation<IItemMutationData, IItemMutationVariables> {
}

export const useItemMutation = (mutation: DocumentNode, options?: MutationHookOptions<IItemMutationData, IItemMutationVariables>) => (
    useMutation<IItemMutationData, IItemMutationVariables>(
        mutation,
        options
    )
)