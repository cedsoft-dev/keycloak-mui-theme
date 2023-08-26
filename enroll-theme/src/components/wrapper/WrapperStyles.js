import {makeStyles} from "@mui/styles";

const WrapperStyles = makeStyles(theme => ({
    brandingSectionRoot: {
        //background: `linear-gradient(115deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
        background: `linear-gradient(115deg, ${theme.palette.primary.light}, ${theme.palette.primary.dark})`,
        //background: `${theme.palette.secondary.main})`,
        color: theme.palette.primary.contrastText,
    },
    paperRoot: {
        //height: "80%",
        width: "90%",
        height: "70%"

    }

}));


export default WrapperStyles;
