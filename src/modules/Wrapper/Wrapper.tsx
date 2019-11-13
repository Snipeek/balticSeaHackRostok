import * as React from "react";
import "./wrapper.scss";
import {Column, Container, Row} from '@/modules/Grid';
import {containerSizeMode} from "@/modules/Grid/Container";

interface IWrapper extends IReactChildren{
  full?: boolean;
  alignCenter?: boolean;
  auth?: string;
  footer?: boolean;
  containerMode?: containerSizeMode;

  left?: any;

  className?: string;
}

export const Wrapper = (props: IWrapper) => {
  return(
      <>
          {props.left ? props.left : null}
          <div className={props.className}>
              {/*<Container sizeMode={props.containerMode || containerSizeMode.fluid}>*/}
              {/*    <Row>*/}
              {/*        <Column>*/}
              {/*            {props.children}*/}
              {/*        </Column>*/}
              {/*    </Row>*/}
              {/*</Container>*/}
              {props.children}
          </div>
      </>
  );
};
