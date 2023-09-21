import {assert} from "keycloakify/tools/assert";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Typography} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function Info(props: PageProps<Extract<KcContext, { pageId: "info.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {msgStr, msg} = i18n;

    assert(kcContext.message !== undefined);

    const {messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client} = kcContext;

    return (
        <Template
            {...{kcContext, i18n, doUseDefaultCss, classes}}
            displayMessage={false}
            headerNode={messageHeader !== undefined ? <>{messageHeader}</> : <>{message.summary}</>}
        >
            <Typography variant={"body1"} className="instruction">
                {message.summary}
            </Typography>
            {requiredActions !== undefined && (
                <Typography
                    variant={"body1"}>{requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(", ")}</Typography>
            )}
            {!skipLink && pageRedirectUri !== undefined ? (
                <LoadingClickButton variant={"contained"} color={"secondary"} href={pageRedirectUri}>{msg("backToApplication")}</LoadingClickButton>
            ) : actionUri !== undefined ? (
                <LoadingClickButton variant={"contained"} color={"secondary"} href={actionUri}>{msg("proceedWithAction")}</LoadingClickButton>
            ) : (
                client.baseUrl !== undefined && (
                    <LoadingClickButton variant={"contained"} color={"secondary"} href={client.baseUrl}>{msg("backToApplication")}</LoadingClickButton>
                )
            )}
        </Template>
    );
}
