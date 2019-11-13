import * as React from "react";
import "./comments.scss";
import {CommentPoint} from "@/modules/Comments/CommentPoint";
import {CommentView} from "@/modules/Comments/CommentView";
import {useRef} from "react";
import {scrollToElm} from "@/helpers/scrollTo";

import classNames from "classnames";
import {Textarea} from "@/components/Textarea/Textarea";
import {Form} from "@/modules/Form/Form";
import {Points} from "@/helpers/Points";
import {indicators} from "@/data/indicators";
import {Empty, message} from "antd";
import {useTranslation} from "react-i18next";
import gql from "graphql-tag";
import {useStartCompanyMutation} from "@/mutations/StartCompanyMutation";
import {useAddPointMutation} from "@/mutations/AddPointMutation";
import {useChangePointMutation} from "@/mutations/ChangePointMutation";
import {useRemovePointMutation} from "@/mutations/RemovePointMutation";

const addPointMutation = gql`
    mutation addPoint($point: PointInput!){
        addPoint(point: $point){
            comment,
            time,
            videoId,
            wave,
        }
    }
`;
const changePointMutation = gql`
    mutation changePoint($point: PointChangeInput!){
        changePoint(point: $point){
            comment,
            time,
            videoId,
            wave,
        }
    }
`;
const removePointMutation = gql`
    mutation removePoint($pointId: Int!){
        removePoint(pointId: $pointId)
    }
`;

interface ICommentsProps {
    video: IVideo;
    points: IPoint[];
    editPoint?: IPoint;
    time?: number;

    onChangeTime?(args: any): void;
    changeEditPoint?(args: any): void;
}

export const Comments = (props: ICommentsProps) => {

    const wrapperRef = useRef(null);
    const [t] = useTranslation();

    const [addPoint] = useAddPointMutation(addPointMutation, {
        refetchQueries: ["findVideo"],
    });

    const [changePoint] = useChangePointMutation(changePointMutation, {
        refetchQueries: ["findVideo"],
    });

    const [removePoint] = useRemovePointMutation(removePointMutation, {
        refetchQueries: ["findVideo"],
    });

    let points: {
        [name in keyof string]: IPoint[];
    } = {};

    let hasPoint = false;

    props.points.forEach(item => {
        if (points[item.time]) {
            points[item.time].push(item);
        } else {
            points[item.time] = [item];
        }
        if (props.editPoint && item.time === props.editPoint.time && item.wave === props.editPoint.wave) {
            hasPoint = true;
        }
    });

    if (props.editPoint && props.editPoint.time && !hasPoint) {
        if (points[props.editPoint.time]){
            points[props.editPoint.time].push(props.editPoint);
        } else {
            points[props.editPoint.time] = [props.editPoint];
        }
    }


    return(
        <div className="comments__wrapper" ref={wrapperRef}>
            {!(Object.keys(points) && Object.keys(points).length) ? (
                <div className="comments__empty">
                    <Empty description={t("empty.comments")} />
                </div>
            ) : null}
            {Object.keys(points).map(time => {
                if (+time === props.time) {

                }
                const isCurrent = +time === props.time;
                return (
                    <div
                        key={"time" + time}
                        className={classNames("comments__time-block", {"comments__time-block_current" : isCurrent})}
                        ref={currentRef => {
                            if (isCurrent && currentRef) {
                                scrollToElm(wrapperRef.current, currentRef)
                            }
                        }}
                    >
                        {points[time].map((item, index) => (
                            <Form
                                key={index}
                                initialValues={{
                                    id: item.id,
                                    comment: item.comment,
                                    time: item.time,
                                    wave: item.wave,
                                }}
                                onSubmit={({ values }) => {
                                    if (values.id) {
                                        changePoint({
                                            variables: {
                                                point: values,
                                            }
                                        })
                                        return;
                                    }
                                    addPoint({
                                        variables: {
                                            ...values,
                                            videoId: props.video.id,
                                        }
                                    });
                                }}
                            >
                                {({ values, controlDecorator, submitForm }) => (
                                    <CommentPoint
                                        fill={indicators[values.wave].fill}
                                        key={item.fill + "pic" + item.time}
                                        title={"pic / " + item.time + " sec"}
                                        edit={props.editPoint === item}
                                        onEdit={() => {
                                            if (props.changeEditPoint) {
                                                props.changeEditPoint(item);
                                            }
                                            if (props.onChangeTime) {
                                                props.onChangeTime(item.time)
                                            }
                                        }}
                                        onSave={() => submitForm()}
                                        onDelete={() => {
                                            if (item.id) {
                                                removePoint({
                                                    variables: {
                                                        pointId: item.id,
                                                    }
                                                })
                                            }
                                        }}
                                        onPointClick={() => {
                                            if (props.onChangeTime) {
                                                props.onChangeTime(item.time)
                                            }
                                        }}
                                        renderBody={({ edit }) => (
                                            <>
                                                {edit ? (
                                                    controlDecorator({ name: "comment"}, <Textarea
                                                        placeholder="Place for comments"
                                                    />)
                                                ) : (
                                                    <CommentView
                                                        key={"pic" + item}
                                                        title={"" + item}
                                                        user={{ name: "Алиса"}}
                                                        comment={item.comment}
                                                    />
                                                )}
                                            </>
                                        )}
                                    />
                                )}
                            </Form>
                        ))}
                    </div>
                )
            })}
        </div>
    );
}