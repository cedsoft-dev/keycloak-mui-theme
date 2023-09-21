import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import {Link, Typography} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;

export default function Error(props: PageProps<Extract<KcContext, { pageId: "error.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { message, client } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("errorTitle")}>
                <Typography variant={"body1"}>{message.summary}</Typography>
                {client !== undefined && client.baseUrl !== undefined && (
                    <LoadingClickButton variant={"contained"} href={client.baseUrl} fullWidth color={"secondary"}>{msg("backToApplication")}</LoadingClickButton>
                )}
        </Template>
    );
}
