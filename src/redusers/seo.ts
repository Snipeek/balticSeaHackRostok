import { CHANGE_SEO } from "@/actions/seo";
import { getInitialState } from "@/redusers/getInitialState";

export interface IRouteSeo {
  title: string;
  description?: string;
  img?: string;
}

const initialState: IRouteSeo = getInitialState("seo", {
  title: `${TITLE}`,
});

export default function seo(store = initialState, action: any): IRouteSeo {
  switch (action.type) {
    case CHANGE_SEO:
      return {
        ...store,
        ...action.seo,
        title: `${action.seo.title} | ${TITLE}`,
      };
    default:
      return store;
  }
}
