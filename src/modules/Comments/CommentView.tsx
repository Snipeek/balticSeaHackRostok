import * as React from "react";

import "./comment.scss";

interface IComment {
    user: {
        name: string;
    }
    title: string;
    comment: string;
}

export const CommentView = (props: IComment) => {
    return(
        <div className="comment__wrapper">
            <div className="comment__text">
                {props.comment}
            </div>
        </div>
    );
}