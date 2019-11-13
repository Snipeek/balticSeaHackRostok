import * as React from 'react';
import { YMaps, Map as YMap, Placemark } from "react-yandex-maps";
import "./map.scss";
import {connect} from 'react-redux';
import {IStore} from '@/redusers';
import {IMapState} from '@/redusers/map';
import {RouteComponentProps, withRouter} from "react-router-dom";
import gql from 'graphql-tag';

// const mapData = {
//     center: [55.751574, 37.573856],
//     zoom: 5,
// };
//
// const coordinates = [
//     [55.684758, 37.738521],
//     [57.684758, 39.738521],
// ];

// const getPoints = gql`
//     query getPoints{
//         getPoints{
//             id,
//             title,
//             location{
//                 lang,
//                 long,
//             },
//         }
//     }
// `;

export interface IItemPageProps { id: string; }

interface IItemProps extends RouteComponentProps<IItemPageProps> {
}

interface IMapProps extends RouteComponentProps, IMapState {
}

export const MapContainer = (props: IMapProps) => {
    return(
        <YMaps>
            <YMap className="map" defaultState={props.data} defaultOptions={{autoFitToViewport: "always"}} width={"100%"} height={"100%"}>
                {props.coordinates.map(coordinate => <Placemark onClick={() => props.history.push(`/point/${coordinate.id}`)} geometry={coordinate.coordinates} />)}
            </YMap>
        </YMaps>
    );
};

export const Map = connect((store: IStore) => ({
    ...store.map,
}))(withRouter(MapContainer));
