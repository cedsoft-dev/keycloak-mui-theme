import {createTheme, lighten} from "@mui/material";

const DarkTheme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: lighten("#ff9472", .2),
            contrastText: "#f5f5f5"
        },
        secondary: {
            main: "#f2709c",
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
export default DarkTheme;
