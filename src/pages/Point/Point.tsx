import {Column, Row} from '@/modules/Grid';
import {CutText} from '@/components/CutText/CutText';
import {Wrapper} from '@/modules/Wrapper/Wrapper';
import * as React from 'react';
import VideoCover from "react-video-cover";
import "./point.scss";
import {Graphic} from '@/modules/Graphic/Graphic';
import { ParentSize } from "@vx/responsive";
import {Calendar} from 'antd';
import {useGetItemQuery} from '@/queries/GetItemQuery';
import {useGetPointQuery} from '@/queries/GetPointQuery';
import gql from 'graphql-tag';
import {RouteComponentProps} from 'react-router';

// const point = {
//     // point: {
//     //     title: "м. Невский проспект, 25",
//     // },
//     type: "Место",
//     title: "Невский проспект, 24",
//     description: "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
//     image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
// };

const getPoint = gql`
    query getPoint($id: Int!){
        getPoint(id: $id){
            id,
            title,
        }
    }
`;

export interface IItemPageProps { id: string; }

interface IPointProps extends RouteComponentProps<IItemPageProps> {
}

export const PointPage = (props: IPointProps) => {
    // props = point;

    const { data } = useGetPointQuery(getPoint, {
        variables: {
            id: +props.match.params.id,
        },
    });

    const point = data && data.getPoint || undefined;

    if (!point) {
        return null;
    }

    const image = 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
    const video = 'https://player.vimeo.com/external/335062628.sd.mp4?s=4b9655670fe0c5320c3a1019c9a05d4c96065117&profile_id=139&oauth2_token_id=57447761';

    return(
        <Wrapper className="point-page__wrapper"
        >
            <Row>
                <Column span={8}>
                    <span className="point-page__type">Адрес</span>
                    <h1 className="point-page__title">{point.title}</h1>
                    {/*<div className="point-page__tags">*/}
                    {/*</div>*/}
                    <p className="point-page__description"><CutText text={point.description} maxCount={100} /></p>
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
            {/*<Row>*/}
            {/*    <Column span={12}>*/}
            {/*        <h3>График</h3>*/}
            {/*        <div className="point-page__graphic">*/}
            {/*            <ParentSize>*/}
            {/*                {parent => (*/}
            {/*                    <Graphic*/}
            {/*                        width={parent.width}*/}
            {/*                        height={300}*/}
            {/*                        parentRef={parent.ref}*/}
            {/*                    />*/}
            {/*                )}*/}
            {/*            </ParentSize>*/}
            {/*        </div>*/}
            {/*    </Column>*/}
            {/*</Row>*/}
            <Row>
                <Column span={12}>
                    <h3>Календарь</h3>
                    <div className="point-page__graphic">
                        <Calendar />
                    </div>
                </Column>
            </Row>
        </Wrapper>
    );
}