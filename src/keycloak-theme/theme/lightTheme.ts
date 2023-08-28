import {createTheme, ThemeOptions} from "@mui/material";
import config from "../../config";
import baseTheme from "./baseTheme";

const lightTheme = (theme: ThemeOptions | undefined) => createTheme({
    ...theme,
    palette: {
        ...theme?.palette,
        mode: "light",
        primary: {
            main: config.palette.primaryColor
        },
        secondary: {
            main: config.palette.secondaryColor
        }
    },

})

export default lightTheme;
