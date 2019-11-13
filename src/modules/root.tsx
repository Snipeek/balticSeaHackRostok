// Root entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import * as React from "react";
import {hot} from "react-hot-loader";
import {Route, Switch} from "react-router-dom";
// Routes
import routes from "@/data/routes";
// Styles - import for side-effects
import "@/global/styles";
import {Wrapper} from "@/modules/Wrapper/Wrapper";
import {Footer} from "@/modules/Footer/Footer";
import {HelmetContainer} from "@/modules/Helmet/Helmet";
import {HeaderContainer} from "@/modules/Header/Header";
import {BaseData} from "@/modules/BaseData/BaseData";
import {containerSizeMode} from "@/modules/Grid/Container";
import {Column, Row} from '@/modules/Grid';
import {Map} from '@/modules/Map/Map';
/* Local */

// import "@/data/boardData";
// ----------------------------------------------------------------------------

const Root = () => (
    <BaseData>
        <HelmetContainer />
        <div className="root-row">
            <Map />
            <div className="page">
                <Wrapper containerMode={containerSizeMode.fluid}>
                    <HeaderContainer title={TITLE} />
                </Wrapper>
                <Route render={({ location }) => (
                    <Switch location={location}>
                        {routes.map(props => <Route key={props.path as string} {...props}/>)}
                    </Switch>
                )} />
                <div id="footer">
                    <Wrapper containerMode={containerSizeMode.fluid}>
                        <Footer />
                    </Wrapper>
                </div>
            </div>
        </div>
        <div id="modal-provider" />
    </BaseData>
);

export default hot(module)(Root);
