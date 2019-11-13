import { themeMode } from "@/redusers/theme";

export const CHANGE_THEME = "CHANGE_THEME";

export const actionChangeTheme = (theme: themeMode) => {
  return {
    type: CHANGE_THEME,
    theme
  };
};
