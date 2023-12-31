import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Typography} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

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
                            <LoadingClickButton tabIndex={4} name={"confirmLogout"} id={"kc-logout"} type={"submit"} value={msgStr("doLogout")} variant={"contained"} color={"secondary"} fullWidth>{msgStr("doLogout")}</LoadingClickButton>
                        </div>
                    </div>
                </form>
                <div id="kc-info-message">
                    {!logoutConfirm.skipLink && client.baseUrl && (
                        <LoadingClickButton href={client.baseUrl} fullWidth>{msgStr("backToApplication")}</LoadingClickButton>
                    )}
                </div>
            </div>
        </Template>
    );
}
