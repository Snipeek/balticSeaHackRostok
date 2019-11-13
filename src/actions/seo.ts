import { IRouteSeo } from "@/redusers/seo";

export const CHANGE_SEO = "CHANGE_SEO";

export const actionChangeSeo = (seo: IRouteSeo) => {
  return {
    type: CHANGE_SEO,
    seo
  };
};
