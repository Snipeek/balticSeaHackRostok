import { storiesOf } from "@storybook/react";
import * as React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Link } from ".";

storiesOf("widgets/Link", module)
  .add("main", () => <BrowserRouter><Route><Link to="#">Link</Link></Route></BrowserRouter>);
