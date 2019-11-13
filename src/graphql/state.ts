// Local GraphQL state

// ----------------------------------------------------------------------------
// IMPORTS

/* NPM */
import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloLink } from "apollo-link";
import { ClientStateConfig, withClientState } from "apollo-link-state";

/* Local */

// Queries

// ----------------------------------------------------------------------------

// Types

/* STATE */
export interface IState {
  count: number;
  useCookieApproved: boolean;
}

// 'Root', which contains the 'State' key
export interface IRoot {
  state: IState;
}

export default function createState(cache: InMemoryCache): ApolloLink {

  // Helper function to retrieve the state from cache
  // function getState(query: any): IState {
  //   return cache.readQuery<IRoot>({ query }).state;
  // }

  // Helper function to write data back to the cache
  // function writeState(state: IState) {
  //   localStorage.setItem("app-state", JSON.stringify(state));
  //   return cache.writeData({ data: { state } });
  // }

  const opt: ClientStateConfig = {
    cache,
    resolvers: {
      Mutation: {
      },
    },
  };

  if (SERVER) {
    opt.defaults = {
      state: {
        __typename: "State",
        count: 0,
        useCookieApproved: false,
      },
    } as IRoot;
  }

  return withClientState(opt);
}
