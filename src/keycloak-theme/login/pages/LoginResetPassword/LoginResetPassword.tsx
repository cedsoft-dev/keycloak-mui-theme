import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, TextField} from "@mui/material";

export default function LoginResetPassword(props: PageProps<Extract<KcContext, {
    pageId: "login-reset-password.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {url, realm, auth} = kcContext;

    const {msg, msgStr} = i18n;

    return (
        <Template
            {...{kcContext, i18n, doUseDefaultCss, classes}}
            displayMessage={false}
            headerNode={msg("emailForgotTitle")}
            infoNode={msg("emailInstruction")}
        >
            <form id="kc-reset-password-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <div className={getClassName("kcFormGroupClass")}>
                    <div className={getClassName("kcInputWrapperClass")}>
                        <TextField
                            type="text"
                            id="username"
                            name="username"
                            autoFocus
                            label={!realm.loginWithEmailAllowed
                                ? msg("username")
                                : !realm.registrationEmailAsUsername
                                    ? msg("usernameOrEmail")
                                    : msg("email")}
                            fullWidth
                            defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
                        />
                    </div>
                </div>
                <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>
                    <Button href={url.loginUrl} fullWidth>{msg("backToLogin")}</Button>
                    <Button fullWidth
                            variant={"contained"}
                            color={"secondary"}
                            type="submit"
                            value={msgStr("doSubmit")}>{msg("doSubmit")}</Button>
                </div>
            </form>
        </Template>
    );
}
