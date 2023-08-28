import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, TextField} from "@mui/material";

export default function UpdateEmail(props: PageProps<Extract<KcContext, { pageId: "update-email.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {msg, msgStr} = i18n;

    const {url, messagesPerField, isAppInitiatedAction, email} = kcContext;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("updateEmailTitle")}>
            <form id="kc-update-email-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <div
                    className={clsx(getClassName("kcFormGroupClass"), messagesPerField.printIfExists("email", getClassName("kcFormGroupErrorClass")))}
                >
                    <TextField fullWidth type={"email"} id={"email"} name={"email"} defaultValue={email.value ?? ""}
                               aria-invalid={messagesPerField.existsError("email")} label={msg("email")}/>
                </div>

                <div className={getClassName("kcFormGroupClass")}>
                    <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                        <div className={getClassName("kcFormOptionsWrapperClass")}></div>
                    </div>
                    <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                        {isAppInitiatedAction ? (
                            <>
                                <Button variant={"contained"} type={"submit"} color={"secondary"}
                                        defaultValue={msgStr("doSubmit")}>{msgStr("doSubmit")}</Button>
                                <Button  type={"submit"} value={"true"} name={"cancel-aia"}
                                        >{msgStr("doCancel")}</Button>
                            </>
                        ) : (
                            <Button fullWidth variant={"contained"} type={"submit"} color={"secondary"}
                                    defaultValue={msgStr("doSubmit")}>{msgStr("doSubmit")}</Button>
                        )}
                    </div>
                </div>
            </form>
        </Template>
    );
}
