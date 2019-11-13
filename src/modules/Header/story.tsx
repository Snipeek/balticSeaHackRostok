import {storiesOf} from "@storybook/react";
import * as React from "react";

import {Header} from "./index";

storiesOf("widgets/Header", module)
    .add("main", () => <Header title="Jusp" user="wqeb3"/>)
    .add("disabled", () => <Header title="Jusp" disabledButton={true}/>)
    .add("login", () => <Header title="Jusp"/>);
