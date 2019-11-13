import * as React from "react";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Column, Row} from "@/modules/Grid";
import "./dash-board.scss";
import {Event} from '@/components/Event/Event';
import {CutText} from '@/components/CutText/CutText';
import gql from 'graphql-tag';
import {useGetEventsQuery} from '@/queries/GetEventsQuery';
import {connect} from 'react-redux';
import {IStore} from '@/redusers';
import {MapContainer} from '@/modules/Map/Map';
import {IMapState} from '@/redusers/map';
import {actionChangeMap} from '@/actions/map';

// const item = {
//     type: "Клуб читателей",
//     title: "Рифмы Петербурга: церемония награждения",
//     description: "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
//     image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//     video: "https://player.vimeo.com/external/368060467.sd.mp4?s=dfc819eb15c991554948480bfd4ca919b9023c65&profile_id=139&oauth2_token_id=57447761",
// };
//
// const items = [item, item, item, item, item, item, item, item, item];

const getEvents = gql`
    query getEvents{
        getEvents{
            id,
            title,
            point{
                id,
                title,
                location{
                    lang,
                    long,
                }
            },
            item{
                id,
                title,
            },
            description,
            people{
                name,
                age
            },
            admins,
            tags
        }
    }
`;

interface IDashBoardPageProps {
    changeMap(map: IMapState): void;
}

export const DashBoardPageContainer = (props: IDashBoardPageProps) => {

    const { data } = useGetEventsQuery(getEvents, {});
    const items = data && data.getEvents || [];
    const map = {
        coordinates: [],
    };

    items.forEach(item => {
        if (item.point && item.point.location) {
            map.coordinates.push({
                id: item.point.id,
                coordinates: [item.point.location.long, item.point.location.lang],
            });
        }
    });

    if (map.coordinates && map.coordinates.length) {
        map.date = {
            center: map.coordinates[0],
            zoom: 5,
        };
        props.changeMap(map);
    }

    return (
        <>
            <Wrapper className="dash-board__wrapper"
            >
                <Row>
                    <Column span={8}>
                        <h1 className="dash-board__title">Мероприятия</h1>
                        <p className="dash-board__description"><CutText text="По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен." maxCount={100} /></p>
                    </Column>
                </Row>
                <Row>
                    <Column span={12}>
                        <Event {...items[0]} max />
                    </Column>
                    <>
                        {items.slice(1).map(item => (
                            <Column span={6}>
                                <Event {...item} />
                            </Column>
                        ))}
                    </>
                </Row>
            </Wrapper>
        </>
    );
};

export const DashBoardPage = connect((store: IStore) => ({
}), dispatch => ({
    changeMap: (map: IMapState) => dispatch(actionChangeMap(map)),
}))(DashBoardPageContainer);
