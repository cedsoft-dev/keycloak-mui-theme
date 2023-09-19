import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import {Link, Typography} from "@mui/material";

export default function LoginVerifyEmail(props: PageProps<Extract<KcContext, { pageId: "login-verify-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { msg } = i18n;

    const { url, user } = kcContext;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("emailVerifyTitle")}>
            <Typography variant={"body1"}>{msg("emailVerifyInstruction1", user?.email ?? "")}</Typography>
            <Typography variant={"body1"}>
                {msg("emailVerifyInstruction2")}
                <br />
                <Link href={url.loginAction} color={"inherit"}>{msg("doClickHere")}</Link>
                &nbsp;
                {msg("emailVerifyInstruction3")}
            </Typography>
        </Template>
    );
}
