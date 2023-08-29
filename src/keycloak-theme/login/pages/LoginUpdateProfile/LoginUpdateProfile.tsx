import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack, TextField} from "@mui/material";

export default function LoginUpdateProfile(props: PageProps<Extract<KcContext, {
    pageId: "login-update-profile.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {msg, msgStr} = i18n;

    const {url, user, messagesPerField, isAppInitiatedAction} = kcContext;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginProfileTitle")}>
            <form id="kc-update-profile-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <Stack spacing={2}>
                    {user.editUsernameAllowed && (
                        <div
                            className={clsx(
                                getClassName("kcFormGroupClass"),
                                messagesPerField.printIfExists("username", getClassName("kcFormGroupErrorClass"))
                            )}
                        >
                            <div className={getClassName("kcInputWrapperClass")}>
                                <TextField
                                    type="text"
                                    id="username"
                                    name="username"
                                    defaultValue={user.username ?? ""}
                                    label={msg("username")}
                                    fullWidth

                                />
                            </div>
                        </div>
                    )}

                    <div
                        className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField
                                type="text" id="email" name="email" defaultValue={user.email ?? ""}
                                label={msg("email")}
                                fullWidth

                            />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("firstName", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField
                                type="text"
                                id="firstName"
                                name="firstName"
                                defaultValue={user.firstName ?? ""}
                                label={msg("firstName")}
                                fullWidth

                            />
                        </div>
                    </div>

                    <div
                        className={clsx(
                            getClassName("kcFormGroupClass"),
                            messagesPerField.printIfExists("lastName", getClassName("kcFormGroupErrorClass"))
                        )}
                    >
                        <div className={getClassName("kcInputWrapperClass")}>
                            <TextField
                                fullWidth
                                type="text"
                                id="lastName"
                                name="lastName"
                                defaultValue={user.lastName ?? ""}
                                label={msg("lastName")}
                            />
                        </div>
                    </div>

                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                            <div className={getClassName("kcFormOptionsWrapperClass")}/>
                        </div>

                        <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                            {isAppInitiatedAction ? (
                                <>
                                    <Button
                                        type={"submit"} color={"secondary"} variant={"contained"}
                                        defaultValue={msgStr("doSubmit")}
                                    >
                                        {msgStr("doSubmit")}
                                    </Button>
                                    <Button
                                        type="submit"
                                        name="cancel-aia"
                                        value="true"
                                    >
                                        {msgStr("doCancel")}
                                    </Button>
                                </>
                            ) : (

                                <Button type={"submit"} fullWidth color={"secondary"} variant={"contained"}
                                        defaultValue={msgStr("doSubmit")}
                                >{msgStr("doSubmit")}</Button>
                            )}
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
