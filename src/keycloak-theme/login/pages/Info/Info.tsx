import {assert} from "keycloakify/tools/assert";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Typography} from "@mui/material";

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
            <div id="kc-info-message">
                <Typography variant={"body1"} className="instruction">
                    {message.summary}

                    {requiredActions !== undefined && (
                        <b>{requiredActions.map(requiredAction => msgStr(`requiredAction.${requiredAction}` as const)).join(",")}</b>
                    )}
                </Typography>
                {!skipLink && pageRedirectUri !== undefined ? (
                    <Button href={pageRedirectUri}>{msg("backToApplication")}</Button>
                ) : actionUri !== undefined ? (
                    <Button href={actionUri}>{msg("proceedWithAction")}</Button>
                ) : (
                    client.baseUrl !== undefined && (
                        <Button href={client.baseUrl}>{msg("backToApplication")}</Button>
                    )
                )}
            </div>
        </Template>
    );
}
