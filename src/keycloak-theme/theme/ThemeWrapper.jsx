import {ThemeProvider, useMediaQuery} from "@mui/material";
import lightTheme from "./lightTheme";
import darkTheme from "./darkTheme";

function ThemeWrapper(props) {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    let theme = lightTheme;
    if (prefersDarkMode) {
        theme = darkTheme;
    }

    return (
        <ThemeProvider theme={theme}>
            {props.children}
        </ThemeProvider>
    )
}

export default ThemeWrapper;
