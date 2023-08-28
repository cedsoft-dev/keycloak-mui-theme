// ejected using 'npx eject-keycloak-page'
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack, TextField} from "@mui/material";

export default function Register(props: PageProps<Extract<KcContext, { pageId: "register.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {url, messagesPerField, register, realm, passwordRequired, recaptchaRequired, recaptchaSiteKey} = kcContext;

    const {msg, msgStr} = i18n;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("registerTitle")}>
            <form id="kc-register-form" className={getClassName("kcFormClass")} action={url.registrationAction}
                  method="post">
                <Stack spacing={2}>
                    <TextField type={"text"} id={"firstName"} name={"firstName"} fullWidth label={msg("firstName")}
                               defaultValue={register.formData.firstName ?? ""}/>

                    <TextField type={"text"} id={"lastName"} name={"lastName"} fullWidth label={msg("lastName")}
                               defaultValue={register.formData.lastName ?? ""}/>

                    <TextField type={"text"} id={"email"} name={"email"}
                               defaultValue={register.formData.email ?? ""} fullWidth label={msg("email")}
                               autoComplete={"email"}/>
                    {!realm.registrationEmailAsUsername && (
                        <TextField type={"text"} id={"username"} name={"username"} fullWidth label={msg("username")}
                                   autoComplete={"username"} defaultValue={register.formData.username ?? ""}/>
                    )}
                    {passwordRequired && (
                        <>
                            <TextField type={"password"} id={"password"} name={"password"} fullWidth
                                       label={msg("password")} autoComplete={"new-password"}/>

                            <TextField type={"password"} id={"password-confirm"} name={"password-confirm"} fullWidth
                                       label={msg("passwordConfirm")}/>
                        </>
                    )}
                    {recaptchaRequired && (
                        <div className="form-group">
                            <div className={getClassName("kcInputWrapperClass")}>
                                <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                            </div>
                        </div>
                    )}
                    <div className={getClassName("kcFormGroupClass")}>
                        <Button href={url.loginUrl} fullWidth>{msg("backToLogin")}</Button>

                        <Button variant={"contained"} color={"secondary"} fullWidth type={"submit"}
                                value={msgStr("doRegister")}>{msgStr("doRegister")}</Button>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
