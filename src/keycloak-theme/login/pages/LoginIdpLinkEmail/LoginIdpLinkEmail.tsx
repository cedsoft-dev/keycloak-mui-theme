import type { KcContext } from "keycloakify/login/kcContext";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { I18n } from "keycloakify/login/i18n";
import {Link, Typography} from "@mui/material";

export default function LoginIdpLinkEmail(props: PageProps<Extract<KcContext, { pageId: "login-idp-link-email.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { url, realm, brokerContext, idpAlias } = kcContext;

    const { msg } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} headerNode={msg("emailLinkIdpTitle", idpAlias)}>
            <Typography variant={"body1"} id="instruction1" className="instruction">
                {msg("emailLinkIdp1", idpAlias, brokerContext.username, realm.displayName)}
            </Typography>
            <Typography variant={"body1"} id="instruction2" className="instruction">
                {msg("emailLinkIdp2")} <Link href={url.loginAction}>{msg("doClickHere")}</Link> {msg("emailLinkIdp3")}
            </Typography>
            <Typography variant={"body1"} id="instruction3" className="instruction">
                {msg("emailLinkIdp4")} <Link href={url.loginAction}>{msg("doClickHere")}</Link> {msg("emailLinkIdp5")}
            </Typography>
        </Template>
    );
}
