import {Mutation} from "react-apollo";

import {MutationHookOptions, useMutation} from "@apollo/react-hooks";
import {DocumentNode} from "graphql";

export interface ISetNotificationsMutationData {
    setNotifications?: boolean;
}

export interface ISetNotificationsMutationVariables {
    notifications: string;
}

export class SetNotificationsMutation extends Mutation<ISetNotificationsMutationData, ISetNotificationsMutationVariables> {
}

export const useSetNotificationsMutation = (mutation: DocumentNode, options: MutationHookOptions<ISetNotificationsMutationData, ISetNotificationsMutationVariables>) => (
    useMutation<ISetNotificationsMutationData, ISetNotificationsMutationVariables>(
        mutation,
        options
    )
)