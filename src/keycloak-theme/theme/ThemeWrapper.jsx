import {ThemeProvider, useMediaQuery} from "@mui/material";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";
import baseTheme from "./baseTheme";

function ThemeWrapper(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let theme = lightTheme;
    if (prefersDarkMode) {
        theme = darkTheme;
    }

    return (
        <ThemeProvider theme={baseTheme}>
            <ThemeProvider theme={theme}>
                {props.children}
            </ThemeProvider>
        </ThemeProvider>
    )
}

export default ThemeWrapper;
