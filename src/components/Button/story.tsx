import {storiesOf} from "@storybook/react";
import * as React from "react";

import {Button, mode, size} from ".";

const divStyle = {
    width: "350px",
};

storiesOf("widgets/Button", module)
    .add("main", () =>
        <Button>Button</Button>)
    .add("link", () =>
        <Button mode={mode.link}>Link</Button>)
    .add("full", () =>
        <div  style={divStyle}>
            <Button size={size.full}>Full button</Button>
        </div>)
    .add("small", () =>
        <Button size={size.small}>Small button</Button>)
    .add("disabled", () =>
        <Button disabled={true}>Disabled button</Button>);
