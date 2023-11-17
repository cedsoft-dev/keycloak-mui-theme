import {Components, Theme} from "@mui/material";

const ComponentsTheme: Components<Omit<Theme, "components">> = {
    MuiButton: {
        defaultProps: {
            color: "inherit"
        }
    },
    MuiSelect: {
        defaultProps: {
            color: "secondary"
        }
    },
    MuiTextField: {
        defaultProps: {
            color: "secondary"
        }
    },
    MuiCheckbox: {
        defaultProps: {
            color: "secondary",
        }
    }
}
export default ComponentsTheme;