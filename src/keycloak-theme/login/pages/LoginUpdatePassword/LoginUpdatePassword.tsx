import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack, TextField} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function LoginUpdatePassword(props: PageProps<Extract<KcContext, {
    pageId: "login-update-password.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {msg, msgStr} = i18n;

    const {url, messagesPerField, isAppInitiatedAction, username} = kcContext;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("updatePasswordTitle")}>
            <form id="kc-passwd-update-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <Stack spacing={2}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={username}
                        readOnly={true}
                        autoComplete="username"
                        style={{display: "none"}}
                    />
                    <input type="password" id="password" name="password" autoComplete="current-password"
                           style={{display: "none"}}/>

                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("password", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField
                                type="password"
                                id="password-new"
                                name="password-new"
                                autoFocus
                                autoComplete="new-password"
                                label={msg("passwordNew")}
                                fullWidth
                            />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("password-confirm", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField
                                type="password"
                                id="password-confirm"
                                name="password-confirm"
                                autoComplete="new-password"
                                label={msg("passwordConfirm")}
                                fullWidth
                            />
                        </div>
                    </div>

                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                            <div className={getClassName("kcFormOptionsWrapperClass")}>
                                {isAppInitiatedAction && (
                                    <div className="checkbox">
                                        <label>
                                            <input type="checkbox" id="logout-sessions" name="logout-sessions"
                                                   value="on"
                                                   checked/>
                                            {msgStr("logoutOtherSessions")}
                                        </label>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                            {isAppInitiatedAction ? (
                                <>
                                    <LoadingClickButton
                                        variant={"contained"} color={"secondary"}
                                        type="submit"
                                        value={msgStr("doSubmit")}>{msgStr("doSubmit")}</LoadingClickButton>
                                    <Button
                                        type="submit"
                                        name="cancel-aia"
                                        value="true">{msgStr("doCancel")}</Button>
                                </>
                            ) : (
                                <LoadingClickButton
                                    variant={"contained"} color={"secondary"}
                                    type="submit"
                                    value={msgStr("doSubmit")} fullWidth>{msgStr("doSubmit")}</LoadingClickButton>
                            )}
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
