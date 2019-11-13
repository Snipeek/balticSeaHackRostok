import { getInitialState } from "@/redusers/getInitialState";
import {CHANGE_MAP} from '@/actions/map';

export interface IMapState {
    data?: any;
    coordinates?: any;
}

const initialState: IMapState = getInitialState("map", {
    data: {
        center: [55.751574, 37.573856],
        zoom: 5,
    },
    coordinates: [
    ],
});

export default function theme(store = initialState, action: any): IMapState {
    switch (action.type) {
        case CHANGE_MAP:
            return ({
                ...store,
                ...action.map,
            });
        default:
            return store;
    }
}
