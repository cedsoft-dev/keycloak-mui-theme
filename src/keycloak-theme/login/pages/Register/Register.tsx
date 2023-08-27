// ejected using 'npx eject-keycloak-page'
import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, TextField} from "@mui/material";

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
                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <TextField type={"text"} id={"firstName"} name={"firstName"} fullWidth label={msg("firstName")}
                                   defaultValue={register.formData.firstName ?? ""}/>
                    </div>
                </div>

                <div
                    className={clsx(
                        getClassName("kcFormGroupClass"),
                        messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass"))
                    )}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <TextField type={"text"} id={"lastName"} name={"lastName"} fullWidth label={msg("lastName")}
                                   defaultValue={register.formData.lastName ?? ""}/>
                    </div>
                </div>

                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                >
                    <div className={getClassName("kcInputWrapperClass")}>
                        <TextField type={"text"} id={"email"} name={"email"}
                                   defaultValue={register.formData.email ?? ""} fullWidth label={msg("email")}
                                   autoComplete={"email"}/>
                    </div>
                </div>
                {!realm.registrationEmailAsUsername && (
                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField type={"text"} id={"username"} name={"username"} fullWidth label={msg("username")}
                                       autoComplete={"username"} defaultValue={register.formData.username ?? ""}/>
                        </div>
                    </div>
                )}
                {passwordRequired && (
                    <>
                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                            )}
                        >
                            <div className={getClassName("kcInputWrapperClass")}>
                                <TextField type={"password"} id={"password"} name={"password"} fullWidth
                                           label={msg("password")} autoComplete={"new-password"}/>
                            </div>
                        </div>

                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                            )}
                        >
                            <div className={getClassName("kcInputWrapperClass")}>
                                <TextField type={"password"} id={"password-confirm"} name={"password-confirm"} fullWidth
                                           label={msg("passwordConfirm")}/>
                            </div>
                        </div>
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
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}>
                            <Button href={url.loginUrl}>{msg("backToLogin")}</Button>
                        </div>
                    </div>

                    <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                        <Button variant={"contained"} color={"secondary"} fullWidth type={"submit"}
                                value={msgStr("doRegister")}>{msgStr("doRegister")}</Button>
                    </div>
                </div>
            </form>
        </Template>
    );
}
