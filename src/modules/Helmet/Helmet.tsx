import * as React from "react";
import Helmet from "react-helmet";
import { connect } from "react-redux";
import { IStore } from "@/redusers";
import classNames from "classnames";
import { themeMode } from "@/redusers/theme";
import { IRouteSeo } from "@/redusers/seo";

interface IHelmetComponentProps {
  theme: themeMode;
  seo: IRouteSeo;
}

export const HelmetComponent = (props: IHelmetComponentProps) => (
  <Helmet
    bodyAttributes={{ class: classNames(`body`, `body_${props.theme}`) }}
  >
    <title>{props.seo.title}</title>
    <link
      rel="apple-touch-icon"
      sizes="180x180"
      href="/static/apple-touch-icon.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="32x32"
      href="/static/favicon-32x32.png"
    />
    <link
      rel="icon"
      type="image/png"
      sizes="16x16"
      href="/static/favicon-16x16.png"
    />
    <link
      rel="mask-icon"
      href="/static/safari-pinned-tab.svg"
      color="#5bbad5"
    />
    <meta name="description" content={props.seo.description} />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="theme-color" content="#ffffff" />
    <meta name="yandex-verification" content="c73602cdfdc08d85" />

    <meta property="og:image" content={`/static/preview_${props.theme}.jpg`}/>
    <meta property="og:image:width" content="1200"/>
    <meta property="og:image:height" content="630"/>
  </Helmet>
);

export const HelmetContainer = connect((store: IStore) => ({
  theme: store.theme,
  seo: store.seo,
}))(HelmetComponent);
