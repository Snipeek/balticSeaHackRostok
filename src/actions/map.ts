import {IMapState} from '@/redusers/map';

export const CHANGE_MAP = "CHANGE_MAP";

export const actionChangeMap = (map: IMapState) => {
    return {
        type: CHANGE_MAP,
        map,
    };
};
