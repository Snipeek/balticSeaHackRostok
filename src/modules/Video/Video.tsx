import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Column, Row} from "@/modules/Grid";
import {VideoPlayer} from "@/modules/VideoPlayer/VideoPlayer";
import {Tabs, tabsSelectType} from "@/modules/Tabs/Tabs";
import {TabsMenuItem} from "@/modules/Tabs/TabsMenuItem";
import {ColorMarker} from "@/components/ColorMarker/ColorMarker";
import { ParentSize } from "@vx/responsive";
import Graphic from "@/modules/Graphic/Graphic";
import {getGradientColor} from "@/helpers/getGradientColor";
import {positionSeptum, Septum} from "@/components/Septum/Septum";
import * as React from "react";
import {useState} from "react";
import {indicators} from "@/data/indicators";
import {Comments} from "@/modules/Comments/Comments";
import * as _ from "lodash";
import {useDeleteVideoMutation} from "@/mutations/DeleteVideoMutation";
import gql from "graphql-tag";
import {RouteComponentProps, withRouter} from "react-router";
import {useStartCompanyMutation} from "@/mutations/StartCompanyMutation";
import {Button, message, Statistic} from "antd";
import {useTranslation} from "react-i18next";

const deleteVideoMutation = gql`
    mutation deleteVideo($id: Int!){
        deleteVideo(id: $id)
    }
`;

const startCompanyMutation = gql`
    mutation startCompany($videoId: Int!){
        startCompany(videoId: $videoId)
    }
`;


const typeMap = {
    0: {
        title: "histogram",
        fill: "#ddd",
        letter: "H",
    },
    1: {
        title: "map",
        fill: "#ddd",
        letter: "M",
    },
};

interface IGraphic {
    fill: string;
    title: string;
    gradient: string;
    data: any[];
}

interface IGraphicWaves {
    alpha?: IGraphic;
    beta?: IGraphic;
    gamma?:IGraphic;
    theta?: IGraphic;
}

interface IVideoProps extends RouteComponentProps {
    video: IVideo;
    graphic?: IGraphicWaves;
    points?: IPointAggregation;
    extremums?: any[];
}

export const VideoContainer = (props: IVideoProps) => {

    const { video, graphic, points, extremums } = props;

    const [t] = useTranslation();

    const [deleteVideo] = useDeleteVideoMutation(deleteVideoMutation, {
        variables: { id: video.id },
        refetchQueries: ["listVideos"],
        onCompleted: ({ deleteVideo }) => {
            if (deleteVideo) {
                message.success(t("message.success.deleteVideo"));
                props.history.push("/dashboard");
            }
        },
    });
    const [startCompany] = useStartCompanyMutation(startCompanyMutation, {
        variables: { videoId: video.id },
        refetchQueries: ["findVideo"],
        onCompleted: ({ startCompany }) => {
            if (startCompany) {
                message.success(t("message.success.testing-in-process"));
            }
        },
    });
    const initialState = 0;
    const [time, setTime] = useState(initialState);
    const [editPoint, changeEditPoint] = useState(undefined);
    const [currentIndicators, setIndicators] = useState([ ...Object.keys(indicators) ]);

    return(
        <>
            <Wrapper className="video__wrapper">
                <Row className="video__row">
                    <Column md={7}>
                        <div className="video__body">
                            <div className="video__player">
                                <VideoPlayer
                                    id={video.videoProviderId}
                                    time={time}
                                    onChangeTime={currentTime => {
                                        setTime(currentTime);
                                    }}
                                />
                            </div>
                            <div className="video__tabs">
                                <Tabs
                                    initialState={{
                                        config: {
                                            indicators: {
                                                type: tabsSelectType.multy,
                                            },
                                            typeMap: {
                                                type: tabsSelectType.single,
                                            }
                                        },
                                        activeTabs: {
                                            indicators: [ ...Object.keys(indicators) ],
                                            typeMap: [ Object.keys(typeMap)[0] ],
                                        }
                                    }}
                                    renderTabs={({ activeTabs, isActive, changeTab }) => (
                                        <div className="video__tabs-head">
                                            <div className="video__tabs-head_left">
                                                {(Object.keys(indicators) as any).map(name => (
                                                    <TabsMenuItem current={isActive({property: "indicators", value: name})} key={name} onClick={() => {
                                                        changeTab({
                                                            property: "indicators",
                                                            value: name,

                                                            changeStateAfter(state) {
                                                                setIndicators([ ...state.activeTabs["indicators"] ]);

                                                                return {...state};
                                                            }
                                                        });
                                                    }}>
                                                        <ColorMarker color={indicators[name].fill} /> {t(indicators[name].title)}
                                                    </TabsMenuItem>
                                                ))}
                                            </div>
                                            {/*<Septum/>*/}
                                            <div className="video__tabs-head_right">
                                                {(Object.keys(typeMap) as any).map(name => (
                                                    <TabsMenuItem current={isActive({property: "typeMap", value: name})} key={name} onClick={() => {
                                                        changeTab({
                                                            property: "typeMap",
                                                            value: name,
                                                        });
                                                    }}>
                                                        <b title={typeMap[name].title}>{typeMap[name].letter}</b>
                                                    </TabsMenuItem>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                >
                                    {({ activeTabs }) => {
                                        return(
                                            <>
                                                <div className="video__statistics">
                                                    <ParentSize>
                                                        {parent => (
                                                            <Graphic
                                                                time={time}
                                                                graphics={_.pick(graphic, activeTabs["indicators"])}
                                                                points={_.pick(points, activeTabs["indicators"])}
                                                                extremums={_.pick(extremums, activeTabs["indicators"])}
                                                                type={activeTabs["typeMap"].indexOf(Object.keys(typeMap)[0]) >= 0}
                                                                width={parent.width}
                                                                height={parent.height}
                                                                parentRef={parent.ref}
                                                                margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
                                                                onChangeTime={currentTime => {
                                                                    setTime(currentTime);
                                                                }}
                                                                addPoint={item => {
                                                                    changeEditPoint(item);
                                                                    setTime(item.time);
                                                                }}
                                                                fill={
                                                                    activeTabs["indicators"]
                                                                        .map(name => indicators[name].fill)
                                                                        .reduce((sum, current) => getGradientColor(sum, current))
                                                                }
                                                            />
                                                        )}
                                                    </ParentSize>
                                                </div>
                                            </>
                                        );
                                    }}
                                </Tabs>
                            </div>
                        </div>
                    </Column>
                    <Column md={5}>
                        <div className="video__sidebar">
                            <div className="video__sidebar-head">
                                <h1 className="video__title">{video.title}</h1>
                                <Septum/>
                                <div className="d-flex">
                                    {video.stats && video.stats.views === 10 ? (
                                        <>
                                            <Statistic title="Index" value={Math.round(video.stats ? video.stats.index : 0)} />
                                            <Septum position={positionSeptum.vertical}/>
                                        </>
                                    ) : null}
                                    {video.stats && video.stats.views === 10 ? (
                                        <>
                                            <Statistic title="Coverage" value={video.stats ? video.stats.maxViews : 0} />
                                            <Septum position={positionSeptum.vertical}/>
                                        </>
                                    ) : null}
                                    {video.stats && video.stats.maxViews === 0 ? (
                                        <Button size="large" type="primary" block onClick={() => startCompany()}>
                                            {t("common.start-company")}
                                        </Button>
                                    ) : null}
                                    {video.stats && video.stats.maxViews > 0 ? (
                                        <Button size="large" type="primary" loading block>
                                            {t("common.testing-in-process")}
                                        </Button>
                                    ) : null}
                                    {video.stats && video.stats.views === 10 ? (
                                        "Testing is complete!"
                                    ) : null}
                                </div>
                                <Septum/>
                                <Row>
                                    <Column span={4}>
                                        <Button type="link" disabled={true}>
                                            {t("common.export-xlsx")}
                                        </Button>
                                    </Column>
                                    <Column span={4}>
                                        <Button type="link" disabled={true}>
                                            {t("common.create-pdf")}
                                        </Button>
                                    </Column>
                                    <Column span={4}>
                                        <Button type="link" onClick={() => deleteVideo()} disabled={video.stats && video.stats.maxViews > 0}>
                                            {t("common.delete-video")}
                                        </Button>
                                    </Column>

                                </Row>
                            </div>
                            <Comments
                                video={video}
                                points={currentIndicators.reduce((sum, name) => ([ ...sum, ...points[name] ]), []) || []}
                                editPoint={editPoint}
                                changeEditPoint={changeEditPoint}

                                time={time}
                                onChangeTime={currentTime => {
                                    setTime(currentTime);
                                }}
                            />
                        </div>
                    </Column>
                </Row>
            </Wrapper>
        </>
    )
};

export const Video = withRouter(VideoContainer);