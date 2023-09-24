import {createTheme} from "@mui/material";

const baseTheme  = createTheme({
    breakpoints: {
        keys: ["xs", "sm","md","lg","xl"],
        values: {
            xs: 0,
            sm: 600,
            md: 900,
            lg: 1200,
            xl: 1536
        }
    }
})

export default baseTheme;
