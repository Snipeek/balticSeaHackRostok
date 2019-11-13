import {storiesOf} from "@storybook/react";
import * as React from "react";
import {Column, Container, Row} from "./index";

storiesOf("widgets/Grid", module)
    .add("main", () => (<Container><Row>
        <Column span={4}>col-1</Column><Column span={4}>col-2</Column><Column span={4}>col-3</Column>
    </Row></Container>))
    .add("with breakpoints number", () => (<Container><Row>
        <Column span={4} xs={12} sm={6} md={4}>col-1</Column><Column span={4} xs={12} sm={6} md={4}>col-2</Column><Column span={4} xs={12} sm={6} md={4}>col-3</Column>
    </Row></Container>))
;
