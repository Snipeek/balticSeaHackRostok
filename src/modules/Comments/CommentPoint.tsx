import * as React from "react";
import {ColorMarker} from "@/components/ColorMarker/ColorMarker";
import classNames from "classnames";
import "./comment-point.scss";
import {Button, mode, size} from "@/components/Button";


interface IComment {
    title: string;
    fill?: string;
    edit?: boolean;

    renderBody?(args: any): any;
    onPointClick?(): any;
    onSave?(args?: any): any;
    onEdit?(args?: any): any;
    onDelete?(args?: any): any;
}

export const CommentPoint = (props: IComment) => {
    return(
        <div
            className="comment-point__wrapper"
        >
            <h5 className="comment-point__title" onClick={props.onPointClick}>
                <ColorMarker
                    color={props.fill || "#ddd"}
                />
                {props.title}
            </h5>
            <div className={classNames("comment-point__controls", { "comment-point__controls_visible" : props.edit })}>
                {props.edit ? (
                    <>
                        <Button mode={mode.link} size={size.small} title="Save" onClick={e => {
                            e.preventDefault();
                            if (props.onSave) {
                                props.onSave();
                            }
                        }}>Save</Button>
                    </>
                ) : (
                    <>
                        <Button mode={mode.link} size={size.small} title="Change" onClick={e => {
                            e.preventDefault();
                            if (props.onEdit) {
                                props.onEdit();
                            }
                        }}>Change</Button>
                        <Button mode={mode.link} size={size.small} title="Delete" onClick={e => {
                            e.preventDefault();
                            if (props.onDelete) {
                                props.onDelete();
                            }
                        }}>Delete</Button>
                    </>
                )}
            </div>
            {props.renderBody ? (
                <div className="comment-point__body">
                    {props.renderBody({ edit: props.edit })}
                </div>
            ) : null}
        </div>
    );
}