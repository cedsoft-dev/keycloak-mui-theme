import {createTheme, darken, lighten, responsiveFontSizes, ThemeOptions} from "@mui/material";
import config from "../../config";
import invertColor from "./InvertColor";
import getLogo from "./getLogo";

const lightTheme = (theme: ThemeOptions | undefined) => createTheme({
    ...theme,
    palette: {
        ...theme?.palette,
        mode: "light",
        primary: {
            light: lighten(config.palette.primaryColor, .2),
            main: config.palette.primaryColor,
            dark: darken(config.palette.primaryColor, .2),
            contrastText: invertColor(config.palette.primaryColor, true),
            // @ts-ignore
            contrastLogo: getLogo(config.palette.primaryColor),
        },
        secondary: {
            light: lighten(config.palette.secondaryColor, .2),
            main: config.palette.secondaryColor,
            dark: lighten(config.palette.secondaryColor, .2),
            contrastText: invertColor(config.palette.secondaryColor, true),
            // @ts-ignore
            contrastLogo: getLogo(config.palette.secondaryColor),
        }
    },

})

const theme = (theme: ThemeOptions | undefined) => responsiveFontSizes(lightTheme(theme));

export default theme;
