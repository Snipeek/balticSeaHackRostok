import * as React from "react";

interface IHtmlContentProps {
    content: string;
    text?: boolean;
}
export const HtmlContent = (props: IHtmlContentProps) => {
    return (
        <div dangerouslySetInnerHTML={{ __html: props.content }} className="html-content-wrap"/>
    );
};
