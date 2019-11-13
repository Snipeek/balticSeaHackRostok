import {Column, Row} from '@/modules/Grid';
import {CutText} from '@/components/CutText/CutText';
import {Wrapper} from '@/modules/Wrapper/Wrapper';
import * as React from 'react';
import VideoCover from "react-video-cover";
import "./event.scss";
import {Avatar, Tag} from 'antd';
import {Link} from 'react-router-dom';
import {RouteComponentProps} from "react-router";
import {useGetEventQuery} from '@/queries/GetEventQuery';
import gql from 'graphql-tag';
import {useEventMutation} from '@/mutations/EventMutation';
import {IMapState} from '@/redusers/map';
import {connect} from 'react-redux';
import {IStore} from '@/redusers';
import {actionChangeMap} from '@/actions/map';
import {DashBoardPageContainer} from '@/pages/DashBoard/DashBoard';
import moment = require('moment');

// const event = {
//     point: {
//         title: "м. Невский проспект, 25",
//     },
//     item: {
//         title: "Клуб читателей",
//     },
//     type: "Мероприятие",
//     title: "Рифмы Петербурга: церемония награждения",
//     description: "По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен.",
//     image: "https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
//     video: "https://player.vimeo.com/external/368060467.sd.mp4?s=dfc819eb15c991554948480bfd4ca919b9023c65&profile_id=139&oauth2_token_id=57447761",
//     time: {
//         start: moment().add(1, 'days'),
//         end: moment().add(1, 'days').add(1, 'hours'),
//     },
// };

const getEvent = gql`
    query getEvent($id: Int!){
        getEvent(id: $id){
            id,
            title,
            description,
            point{
                id,
                title,
                location{
                    lang,
                    long,
                }
            },
            people{
                name,
                age,
                tags{
                    id,
                    value,
                },
            },
#            admins,
            time{
                start,
                end
            },
            item{
                id,
                title
            },
#            tags
        }
    }
`;
// const getPoints = gql`
//     query getPoints{
//         getPoints{
//             id,
//             title,
//             location{
//                 long,
//                 lang
//             }
//         }
//     }
// `;
//
// const getItems = gql`
//     query getItems{
//         getItems{
//             id,
//             title,
//         }
//     }
// `;

// const eventMutation = gql`
//     mutation event($create: InputCreateEventType, $update: InputUpdateEventType, $delete: [Int]){
//         event(create: $create, update: $update, delete: $delete){
//             create{
//                 id,
//                 title,
//                 description,
//                 people,
//                 admins,
//             },
//             update,
//             delete
//         }
//     }
// `;

export interface IEventPageParams { id: string; }

interface IEventPageProps extends RouteComponentProps<IEventPageParams> {
    changeMap(map: IMapState): void;
}

export const EventPageContainer = (props: IEventPageProps) => {

    const { data } = useGetEventQuery(getEvent, {
        variables: {
            id: +props.match.params.id,
        },
    });

    // const [ doEvent ] = useEventMutation(eventMutation, {});

    const event = data && data.getEvent || undefined;
    // if (event && event.point && event.point.location) {
    //     const coord = [event.point.location.long, event.point.location.lang];
    //     const map = {
    //         date: {
    //             center: coord,
    //             zoom: 5,
    //         },
    //         coordinates: [coord],
    //     };
    //     props.changeMap(map);
    // }

    if (!event) {
        return null;
        // const usePoints  = useGetPointsQuery(getPoints);
        //
        // const points = usePoints.data && usePoints.data.getPoints || undefined;
        //
        // const useItems = useGetItemsQuery(getItems);
        //
        // const items = useItems.data && useItems.data.getItems || undefined;
        //
        // return (
        //     <Wrapper className="event-page__wrapper"
        //     >
        //         <Row>
        //             <Column span={12}>
        //                 <Form initialValues={{
        //                     start: moment(),
        //                     end: moment(),
        //                     tags: [],
        //                     ...event
        //                 }} onSubmit={({ values }) => {
        //                     const variables = {
        //                         delete: [],
        //                     };
        //                     variables[event && event.id ? 'update' : 'create'] = values;
        //                     doEvent({
        //                         variables,
        //                     });
        //                 }}>
        //                     {({ controlDecorator }) => (
        //                         <>
        //                             <span className="event-page__type">
        //                                 Мероприятие
        //                             </span>
        //                             <h1 className="event-page__title">
        //                                 {controlDecorator({name: "title"}, ( <Input
        //                                     placeholder="Заголовок"
        //                                     size="large"
        //                                 />))}
        //                             </h1>
        //                             <Row className="event-page__times">
        //                                 <Column>
        //                                     {controlDecorator({ name: "start" }, (
        //                                         <TimePicker
        //                                             size="large"
        //                                             format="HH:mm"
        //                                         />
        //                                     ))}
        //                                 </Column>
        //                                 <Column>
        //                                     {controlDecorator({ name: "end" }, (
        //                                         <TimePicker
        //                                             size="large"
        //                                             format="HH:mm"
        //                                         />
        //                                     ))}
        //                                 </Column>
        //                             </Row>
        //                             {controlDecorator({ name: "pointId" }, <Select
        //                                 showSearch
        //                                 size="large"
        //                                 placeholder="Выберите точку"
        //                                 optionFilterProp="children"
        //                                 filterOption={(input, option) =>
        //                                     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //                                 }
        //                             >
        //                                 {points ? points.map(point => (
        //                                     <SelectAnt.Option value={point.id}>{point.title}</SelectAnt.Option>
        //                                 )) : null}
        //                             </Select>)}
        //                             {controlDecorator({ name: "itemId" }, <Select
        //                                 showSearch
        //                                 size="large"
        //                                 placeholder="Выберите кружок"
        //                                 optionFilterProp="children"
        //                                 filterOption={(input, option) =>
        //                                     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        //                                 }
        //                             >
        //                                 {items ? items.map(item => (
        //                                     <SelectAnt.Option value={item.id}>{item.title}</SelectAnt.Option>
        //                                 )) : null}
        //                             </Select>)}
        //                             <div className="event-page__tags">
        //                                 {/*{event.item ? (*/}
        //                                 {/*    <Link to={`/item/123`}>*/}
        //                                 {/*        <Tag style={{ cursor: 'pointer' }}>{event.item.title}</Tag>*/}
        //                                 {/*    </Link>*/}
        //                                 {/*) : null}*/}
        //                                 {/*{event.time ? (*/}
        //                                 {/*    <>*/}
        //                                 {/*        <Tag>{event.time.start.lang("ru").format("MMM Do YY")}</Tag>*/}
        //                                 {/*        <Tag>{event.time.start.format("h:mm")} — {event.time.end.format("h:mm")}</Tag>*/}
        //                                 {/*    </>*/}
        //                                 {/*) : null}*/}
        //                                 {/*{event.point ? (*/}
        //                                 {/*    <Link to={`/point/123`}>*/}
        //                                 {/*        <Tag style={{ cursor: 'pointer' }}>{event.point.title}</Tag>*/}
        //                                 {/*    </Link>*/}
        //                                 {/*) : null}*/}
        //                             </div>
        //                             <p className="event-page__description">
        //                                 {controlDecorator({name: "desc"}, ( <Input.TextArea
        //                                     placeholder="Описание"
        //                                     size="large"
        //                                     rows={4}
        //                                 />))}
        //                             </p>
        //                             <Button
        //                                 size="large"
        //                                 color="promary"
        //                                 htmlType="submit"
        //                             >
        //                                 {event && event.id ? "Обновить" : "Добавить"}
        //                             </Button>
        //                         </>
        //                     )}
        //                 </Form>
        //             </Column>
        //             {/*<Column span={12}>*/}
        //             {/*    {event.video ? (*/}
        //             {/*        <div className="event-page__video">*/}
        //             {/*            <VideoCover*/}
        //             {/*                videoOptions={{*/}
        //             {/*                    src: event.video,*/}
        //             {/*                    autoPlay: true,*/}
        //             {/*                    muted: true,*/}
        //             {/*                    loop: true,*/}
        //             {/*                }}*/}
        //             {/*            />*/}
        //             {/*        </div>*/}
        //             {/*    ) : (*/}
        //             {/*        <img className="event-page__img" src={event.image} />*/}
        //             {/*    )}*/}
        //             {/*</Column>*/}
        //         </Row>
        //     </Wrapper>
        // );
    }

    const image = 'https://images.pexels.com/photos/3014019/pexels-photo-3014019.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260';
    const video = 'https://player.vimeo.com/external/368060467.sd.mp4?s=dfc819eb15c991554948480bfd4ca919b9023c65&profile_id=139&oauth2_token_id=57447761';

    return(
        <Wrapper className="event-page__wrapper"
        >
            <Row>
                <Column span={8}>
                    <span className="event-page__type">
                        Мероприятие
                    </span>
                    <h1 className="event-page__title">{event.title}</h1>
                    <div className="event-page__tags">
                        {event.item ? (
                            <Link to={`/item/${event.item.id}`}>
                                <Tag style={{ cursor: 'pointer' }}>{event.item.title}</Tag>
                            </Link>
                        ) : null}
                        {event.time ? (
                            <>
                                {/*{JSON.stringify(event.time)}*/}
                                {/*<Tag>{moment(event.time.start, 'mm.DD.YYYY').lang("ru").format("MMM Do YY")}</Tag>*/}
                                {/*<Tag>{moment(event.time.start, 'MM DD YY').format("h:mm")} — {moment(event.time.end, 'MM DD YY').format("h:mm")}</Tag>*/}
                            </>
                        ) : null}
                        {event.point ? (
                            <Link to={`/point/${event.point.id}`}>
                                <Tag style={{ cursor: 'pointer' }}>{event.point.title}</Tag>
                            </Link>
                        ) : null}
                    </div>
                    <p className="event-page__description"><CutText text={event.description} maxCount={100} /></p>
                </Column>
                <Column span={12}>
                    {video ? (
                        <div className="event-page__video">
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
                        <img className="event-page__img" src={image} />
                    )}
                </Column>
            </Row>
            <Row>
                <Column span={12}>
                    <h3>Посетители</h3>
                    <div className="event-page__users">
                        {event && event.people && event.people.map(user => (
                            <div className="event-page__user">
                                <Avatar icon="user" className="event-page__user-icon" />
                                <h4>{user.name}</h4>
                            </div>
                        ))}
                    </div>
                </Column>
            </Row>
        </Wrapper>
    );
}

export const EventPage = connect((store: IStore) => ({
}), dispatch => ({
    changeMap: (map: IMapState) => dispatch(actionChangeMap(map)),
}))(EventPageContainer);
