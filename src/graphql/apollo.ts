// Apollo GraphQL client

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import {InMemoryCache, NormalizedCacheObject} from "apollo-cache-inmemory";
import {ApolloClient} from "apollo-client";
import {ApolloLink} from "apollo-link";
import {onError} from "apollo-link-error";
import {BatchHttpLink} from "apollo-link-batch-http";
import ReduxLink from "apollo-link-redux";
/* Local */
import {storage} from "@/lib/Storage";
import {getRedirect} from "@/helpers/httpError";
// import {useCookies} from "react-cookie";
// import {logger} from "@/lib/Logger";

// ----------------------------------------------------------------------------

// const credentials = "include";

let client: ApolloClient<NormalizedCacheObject> | null = null;
const clients: {[name: string]: ApolloClient<NormalizedCacheObject>} = {};

interface ICreateClientOptions {
  fromCache?: boolean;
  clientName?: string;
}

export function createClient(cookie: any, ctx: any, store: any, options?: ICreateClientOptions): ApolloClient<NormalizedCacheObject> {
  options = options || {};
  if (!SERVER && client) {
    return client;
  }
  const clientName = options.clientName || "default";
  if (options.fromCache && clients[clientName]) {
    return  clients[clientName];
  }

  if (ctx) {
    storage.setItem("ctx", ctx);
  }
  if (store) {
    storage.setItem("store", store);
  } else {
    if (!SERVER) {
      store = storage.getItem("store");
    }
  }

  const authMiddleware = new ApolloLink((operation, forward) => {

    const cookies = SERVER ? require("cookie-universal")(ctx.req, ctx.res) : require("cookie-universal")(undefined, undefined);

    let token = cookies.get("auth-token") || "";

    token = token.trim();
    const headers: {[name: string]: string} = {};
    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }
    operation.setContext({
      headers,
    });

    return forward!(operation);
  });

  // Create the cache first, which we'll share across Apollo tooling.
  // This is an in-memory cache. Since we'll be calling `createClient` on
  // universally, the cache will survive until the HTTP request is
  // responded to (on the server) or for the whole of the user's visit (in
  // the browser)
  const cache = new InMemoryCache({
    addTypename: false,
  });

  // If we're in the browser, we'd have received initial state from the
  // server. Restore it, so the client app can continue with the same data.
  if (!SERVER) {
      cache.restore((window as any).__APOLLO_STATE__);
  }
  // Return a new Apollo Client back, with the cache we've just created,
  // and an array of 'links' (Apollo parlance for GraphQL middleware)
  // to tell Apollo how to handle GraphQL requests
  client = new ApolloClient({
    cache,
    link: ApolloLink.from([

          // General error handler, to log errors back to the console.
          // Replace this in production with whatever makes sense in your
          // environment. Remember you can use the global `SERVER` variable to
          // determine whether you're running on the server, and record errors
          // out to third-party services, etc
          onError(({graphQLErrors, networkError}) => {
            if (graphQLErrors) {
              if (!SERVER) {
                const redirectUrl = getRedirect(graphQLErrors);
                if (redirectUrl) {
                  location.assign(redirectUrl);
                }
              }
              graphQLErrors.map(({message, locations, path}) => {
                if (!SERVER) {
                  console.log(
                      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                  );
                }

              });
            }
            if (networkError) {
              console.log(`[Network error]: ${networkError}`);

            }
          }),
          authMiddleware,
          new ReduxLink(store),
          // External GraphQL server to connect to. CHANGE THIS -- by default, it's
          // just using a public playground to pull sample API data.
          new BatchHttpLink({
            uri: GRAPHQL,
            headers: cookie,
            fetchOptions: {
              withCredentials: false,
              // credentials,
            },
          }),
        ],
    ),
    // On the server, enable SSR mode
    ssrMode: SERVER,
    connectToDevTools: true,
  });
  return client;
}
