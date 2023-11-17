import {createTheme, darken, responsiveFontSizes, ThemeOptions} from "@mui/material";
import config from "../../config";
import getLogo from "./getLogo";
import ComponentsTheme from "./conponentsTheme";

const darkTheme = (theme: ThemeOptions | undefined) => createTheme({
    ...theme,
    palette: {
        ...theme?.palette,
        mode: "dark",
        primary: {
            main: darken(config.palette.primaryColor, .2),
            contrastText: "#f5f5f5",
            // @ts-ignore
            contrastLogo: getLogo(config.palette.primaryColor),
        },
        secondary: {
            main: darken(config.palette.secondaryColor, .2),
            contrastText: "#FBF7F5",
            // @ts-ignore
            contrastLogo: getLogo(config.palette.secondaryColor),
        },
        text: {
            primary: "#FBF7F5",
            secondary: "#9e9e9e"
        },
        background: {
            default: "#121212",
            paper: "#121212",
        },
        action: {
            active: "#fff",
            hover: "rgba(255,255,255,0.08)",
            hoverOpacity: .08,
            selected: "rgba(255,255,255,0.16)",
            selectedOpacity: .16,
            disabled: "rgba(255,255,255,0.3)",
            disabledBackground: "rgba(255,255,255,0.12)",
            disabledOpacity: .38,
            focus: "rgba(255,255,255,0.12)",
            focusOpacity: .12,
            activatedOpacity: .24
        },
        divider: "rgba(255, 255, 255, 0.12)"
    },
    components: ComponentsTheme
})
const theme = (theme: ThemeOptions | undefined) => responsiveFontSizes(darkTheme(theme))

export default theme;
