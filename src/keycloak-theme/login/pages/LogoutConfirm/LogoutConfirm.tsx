import { clsx } from "keycloakify/tools/clsx";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import { useGetClassName } from "keycloakify/login/lib/useGetClassName";
import type { KcContext } from "../../kcContext";
import type { I18n } from "../../i18n";
import {Button, Typography} from "@mui/material";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "logout-confirm.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, Template, classes } = props;

    const { getClassName } = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const { url, client, logoutConfirm } = kcContext;

    const { msg, msgStr } = i18n;

    return (
        <Template {...{ kcContext, i18n, doUseDefaultCss, classes }} displayMessage={false} headerNode={msg("logoutConfirmTitle")}>
            <div id="kc-logout-confirm" className="content-area">
                <Typography variant={"body1"}>{msg("logoutConfirmHeader")}</Typography>
                <form className="form-actions" action={url.logoutConfirmAction} method="POST">
                    <input type="hidden" name="session_code" value={logoutConfirm.code} />
                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options">
                            <div className={getClassName("kcFormOptionsWrapperClass")}></div>
                        </div>
                        <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
                            <Button tabIndex={4} name={"confirmLogout"} id={"kc-logout"} type={"submit"} value={msgStr("doLogout")} variant={"contained"} color={"secondary"} fullWidth>{msgStr("doLogout")}</Button>
                        </div>
                    </div>
                </form>
                <div id="kc-info-message">
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <Button href={client.baseUrl} fullWidth>{msgStr("backToApplication")}</Button>
                    )}
                </div>
            </div>
        </Template>
    );
}
