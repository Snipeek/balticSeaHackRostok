import { getInitialState } from "@/redusers/getInitialState";
import { CHANGE_THEME } from "@/actions/theme";

export enum themeMode {
  light = "light",
  dark = "dark",
}

export const themeModeConfig = {
  [themeMode.light]: {
    domain: "live",
  },
  [themeMode.dark]: {
    domain: "industrial",
  },
};

const initialState: themeMode = getInitialState("theme", themeMode.light);

export default function theme(store = initialState, action: any): themeMode {
  switch (action.type) {
    case CHANGE_THEME:
      if (store !== action.theme) {
        return action.theme;
      }
    default:
      return store;
  }
}
