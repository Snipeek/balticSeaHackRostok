import {Column, Row} from '@/modules/Grid';
import {CutText} from '@/components/CutText/CutText';
import {Wrapper} from '@/modules/Wrapper/Wrapper';
import * as React from 'react';
import VideoCover from "react-video-cover";
import "./item.scss";
import {Graphic} from '@/modules/Graphic/Graphic';
import { ParentSize } from "@vx/responsive";
import {Calendar} from 'antd';
import gql from 'graphql-tag';
import {useGetEventQuery} from '@/queries/GetEventQuery';
import {useGetItemQuery} from '@/queries/GetItemQuery';
import {RouteComponentProps} from 'react-router';
import {Event} from '@/components/Event/Event';

// const item = {
//     // point: {
//     //     title: "м. Невский проспект, 25",
//     // },
//     type: "Кружок / секция",
//     title: "Клуб читателей",
//     description: "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
//     image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
// };

const getItem = gql`
    query getItem($id: Int!){
        getItem(id: $id){
            id,
            title,
            events{
                id,
                title,
                description,
            },
        }
    }
`;

export interface IItemPageProps { id: string; }

interface IItemProps extends RouteComponentProps<IItemPageProps> {
}

export const ItemPage = (props: IItemProps) => {

    const image = 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
    const video = 'https://player.vimeo.com/external/368060467.sd.mp4?s=dfc819eb15c991554948480bfd4ca919b9023c65&profile_id=139&oauth2_token_id=57447761';

    const { data } = useGetItemQuery(getItem, {
        variables: {
            id: +props.match.params.id,
        },
    });

    // const [ doEvent ] = useEventMutation(eventMutation, {});

    const item = data && data.getItem || undefined;

    if (!item) {
        return null;
    }

    return(
        <Wrapper className="point-page__wrapper"
        >
            <Row>
                <Column span={8}>
                    <span className="point-page__type">Кружок / секция</span>
                    <h1 className="point-page__title">{item.title}</h1>
                    {/*<div className="point-page__tags">*/}
                    {/*</div>*/}
                    {/*<p className="point-page__description"><CutText text={item.description} maxCount={100} /></p>*/}
                </Column>
                <Column span={12}>
                    {video ? (
                        <div className="point-page__video">
                            <VideoCover
                                videoOptions={{
                                    src: video,
                                    autoPlay: true,
                                    muted: true,
                                    loop: true,
                                }}
                            />
                        </div>
                    ) : (
                        <img className="point-page__img" src={image} />
                    )}
                </Column>
            </Row>
            <Row>
                <Column span={12}>
                    <h3>Посещаемость</h3>
                    <div className="point-page__graphic">
                        <ParentSize>
                            {parent => (
                                <Graphic
                                    width={parent.width}
                                    height={300}
                                    parentRef={parent.ref}
                                />
                            )}
                        </ParentSize>
                    </div>
                </Column>
            </Row>
            <Row>
                <Column span={12}>
                    <h3>Мероприятия</h3>
                    <div className="point-page__events">
                        <Row>
                            {item.events && item.events.map(item => (
                                <Column span={6}>
                                    <Event {...item} />
                                </Column>
                            ))}
                        </Row>
                    </div>
                </Column>
            </Row>
            {/*<Row>*/}
            {/*    <Column span={12}>*/}
            {/*        <h3>Календарь</h3>*/}
            {/*        <div className="point-page__graphic">*/}
            {/*            <Calendar />*/}
            {/*        </div>*/}
            {/*    </Column>*/}
            {/*</Row>*/}
        </Wrapper>
    );
}