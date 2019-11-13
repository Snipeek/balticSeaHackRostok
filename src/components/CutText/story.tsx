import {CutText} from "@/components/CutText/CutText";
import {storiesOf} from "@storybook/react";
import * as React from "react";

storiesOf("widgets/CutText", module)
    .add("main", () => (<CutText text="По своей сути рыбатекст является альтернативой традиционному lorem ipsum, который вызывает у некторых людей недоумение при попытках прочитать рыбу текст. В отличии от lorem ipsum, текст рыба на русском языке наполнит любой макет непонятным смыслом и придаст неповторимый колорит советских времен."/>));
