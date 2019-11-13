import {Button, mode} from "@/components/Button/Button";
import * as React from "react";
import {HtmlContent} from "@/components/HtmlContent/HtmlContent";

interface ICutText {
    maxCount?: number;
    moreLink?: boolean;
    lessLink?: boolean;
    moreHtml?: boolean;
    text?: string;
    full?: boolean;
}

export class CutText extends React.Component<ICutText> {
    public state: {full: boolean};

    constructor(props: ICutText) {
        super(props);
        this.state = {
            full: this.props.full || false,
        };
    }

    public render() {
        if (this.props.text && this.props.text.length) {
            const moreLink = this.props.moreLink || false;
            const lessLink = this.props.lessLink || false;
            const moreHtml = this.props.moreHtml || false;
            const maxCount = this.props.maxCount || 200;
            const isMoreText = this.props.text.length > maxCount;
            const points = isMoreText ? "..." : "";
            const textFull = this.props.text.replace(/<(?:.|\n)*?>/gm, "");
            const text = !this.state.full ? textFull.slice(0, maxCount) + points : textFull;
            return (
                <>
                    <HtmlContent content={isMoreText && this.state.full && moreHtml ? this.props.text : text}/>
                    {isMoreText && !this.state.full && moreLink ? <Button mode={mode.link} onClick={() => this.toggleOpen()}>Еще</Button> : null}
                    {isMoreText && this.state.full && lessLink ? <Button mode={mode.link} onClick={() => this.toggleOpen()} >Свернуть</Button> : null}
                </>
            );
        }
        return null;
    }

    private toggleOpen = () => {
        this.setState({
            full: !this.state.full,
        });
    }
}
