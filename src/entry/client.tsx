// Client entry point

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */

// Create browser history, for navigation a la single page apps

// React, our UI engine
import * as React from "react";

// HOC for enabling Apollo GraphQL `<Query>` and `<Mutation>`
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloProviderHooks } from '@apollo/react-hooks';

// Attach React to the browser DOM
import * as ReactDOM from "react-dom";

// Single page app routing
import { Router } from "react-router-dom";

/* Local */

// Our main component, and the starting point for server/browser loading
import Root from "@/modules/root";

// Helper function that creates a new Apollo client per request
import { createClient } from "@/graphql/apollo";

// For Styled Components theming
import { ThemeProvider } from "@/lib/styledComponents";

// ... and the actual Styled Components theme
import defaultTheme from "@/themes/default";
import { Provider } from "react-redux";
import history from "@/lib/history";
// ----------------------------------------------------------------------------
// Create a browser history
import {createAppStore} from "@/redusers";

/* Translate */
import i18n from '../translations/i18n';
import {I18nextProvider} from "react-i18next";

const store = createAppStore();

// Create Apollo client
const client = createClient({}, null, store);
// Render
ReactDOM.render(
    <ThemeProvider theme={defaultTheme}>
        <I18nextProvider i18n={i18n}>
            <ApolloProvider client={client}>
                <ApolloProviderHooks client={client}>
                    <Router history={history}>
                        <Provider store = {store}>
                            <Root />
                        </Provider>
                    </Router>
                </ApolloProviderHooks>
            </ApolloProvider>
        </I18nextProvider>
    </ThemeProvider>,
    document.getElementById("root"),
);
