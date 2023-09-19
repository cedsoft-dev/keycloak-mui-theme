import {createTheme, darken, lighten, ThemeOptions} from "@mui/material";
import config from "../../config";
import baseTheme from "./baseTheme";
import invertColor from "./InvertColor";

const lightTheme = (theme: ThemeOptions | undefined) => createTheme({
    ...theme,
    palette: {
        ...theme?.palette,
        mode: "light",
        primary: {
            light: lighten(config.palette.primaryColor, .3),
            main: config.palette.primaryColor,
            dark: darken(config.palette.primaryColor, .3),
            contrastText: invertColor(config.palette.primaryColor, true)
        },
        secondary: {
            light: lighten(config.palette.secondaryColor, .3),
            main: config.palette.secondaryColor,
            dark: lighten(config.palette.secondaryColor, .3),
            contrastText: invertColor(config.palette.secondaryColor, true)
        }
    },

})

export default lightTheme;
