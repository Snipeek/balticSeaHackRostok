import {storiesOf} from "@storybook/react";
import * as React from "react";

import {Avatar} from "./index";

storiesOf("widgets/Avatar", module)
    .add("main", () =>
      <div>
        <Avatar name="Кирилл Плотников"/>
      </div>);
