import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import {Link, Typography} from "@mui/material";

export default function LoginPageExpired(props: PageProps<Extract<KcContext, { pageId: "login-page-expired.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("pageExpiredTitle")}>
            <Typography variant={"body1"} id="instruction1" className="instruction">
                {msg("pageExpiredMsg1")}
                <Link id="loginRestartLink" href={url.loginRestartFlowUrl}>
                    {msg("doClickHere")}
                </Link>{" "}
                .<br />
                {msg("pageExpiredMsg2")}{" "}
                <Link id="loginContinueLink" href={url.loginAction}>
                    {msg("doClickHere")}
                </Link>{" "}
                .
            </Typography>
        </Template>
    );
}
