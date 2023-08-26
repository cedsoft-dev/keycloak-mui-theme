import {makeStyles} from "@mui/styles";

const TemplateStyles = makeStyles(theme => ({

    logo: {
        width: "7.5rem",
        height: "auto",
        maxWidth: "50%",
        marginBottom: theme.spacing(3),

        [theme.breakpoints.down("sm")]: {
            maxWidth: "80%",
        }
    }
}))
export default TemplateStyles;
