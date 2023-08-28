import {createTheme, darken, lighten, ThemeOptions} from "@mui/material";
import config from "../../config";

const darkTheme = (theme: ThemeOptions | undefined) => createTheme({
    ...theme,
    palette: {
        ...theme?.palette,
        mode: "dark",
        primary: {
            main: darken(config.palette.primaryColor, .2),
            contrastText: "#f5f5f5"
        },
        secondary: {
            main: darken(config.palette.secondaryColor, .2),
            contrastText: "#FBF7F5"
        },
        text: {
            primary: "#FBF7F5",
            secondary: "#9e9e9e"
        },
        background: {
            default: "#121212",
            paper: "#121212",
        },
        divider: "rgba(255, 255, 255, 0.12)"

    }
})
export default darkTheme
