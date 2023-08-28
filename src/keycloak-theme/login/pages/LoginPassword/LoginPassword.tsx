import type {FormEventHandler} from "react";
import {useState} from "react";
import {clsx} from "keycloakify/tools/clsx";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, TextField} from "@mui/material";

export default function LoginPassword(props: PageProps<Extract<KcContext, { "pageId": "login-password.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {realm, url, login} = kcContext;

    const {msg, msgStr} = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        formElement.submit();
    });

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("doLogIn")}>
            <div id="kc-form">
                <div id="kc-form-wrapper">
                    <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                        <div className={getClassName("kcFormGroupClass")}>
                            <hr/>
                            <TextField
                                tabIndex={2}
                                id="password"
                                name="password"
                                type="password"
                                autoFocus={true}
                                autoComplete="on"
                                defaultValue={login.password ?? ""}
                                label={msg("password")}
                                fullWidth
                            />
                        </div>
                        <div className={clsx(getClassName("kcFormGroupClass"), getClassName("kcFormSettingClass"))}>
                            <div id="kc-form-options"/>
                            <div className={getClassName("kcFormOptionsWrapperClass")}>
                                {realm.resetPasswordAllowed && (
                                    <Button tabIndex={5} href={url.loginResetCredentialsUrl}
                                            fullWidth>{msg("doForgotPassword")}</Button>
                                )}
                            </div>
                        </div>
                        <div id="kc-form-buttons" className={getClassName("kcFormGroupClass")}>
                            <Button tabIndex={4} name="login"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doLogIn")}
                                    disabled={isLoginButtonDisabled} fullWidth variant={"contained"} color={"secondary"}>{msgStr("doLogIn")}</Button>

                        </div>
                    </form>
                </div>
            </div>
        </Template>
    );
}
