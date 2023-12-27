import {useEffect, useState} from "react";
import {headInsert} from "keycloakify/tools/headInsert";
import {pathJoin} from "keycloakify/bin/tools/pathJoin";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Stack, TextField, ToggleButton, ToggleButtonGroup} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function LoginOtp(props: PageProps<Extract<KcContext, { pageId: "login-otp.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });
    const {otpLogin, url} = kcContext;

    const {msg, msgStr} = i18n;

    const [otpState, setOtpState] = useState(null)

    useEffect(() => {
        let isCleanedUp = false;

        const {prLoaded, remove} = headInsert({
            "type": "javascript",
            "src": pathJoin(kcContext.url.resourcesCommonPath, "node_modules/jquery/dist/jquery.min.js")
        });

        (async () => {
            await prLoaded;

            if (isCleanedUp) {
                return;
            }

            evaluateInlineScript();
        })();

        return () => {
            isCleanedUp = true;
            remove();
        };
    }, []);

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("doLogIn")}>
            <form id="kc-otp-login-form" className={getClassName("kcFormClass")} action={url.loginAction} method="post">
                <Stack spacing={2}>
                    {otpLogin.userOtpCredentials.length > 1 && (
                        <ToggleButtonGroup
                            fullWidth
                            color="primary"
                            value={otpState}
                            exclusive
                            onChange={(event, newValue) => {
                                if (newValue === otpState) {
                                    return null;
                                }
                                setOtpState(newValue)
                            }}
                            aria-label="Platform"
                        >
                            {otpLogin.userOtpCredentials.map(otpCredential => (
                                <ToggleButton key={otpCredential.id}
                                              value={otpCredential.id}>{otpCredential.userLabel}</ToggleButton>
                            ))}
                        </ToggleButtonGroup>

                    )}
                    <input type="hidden" value={otpState ?? ""} name={"selectedCredentialId"}/>

                    <div className={getClassName("kcFormGroupClass")}>
                        <TextField fullWidth name={"otp"} autoComplete={"off"} type="text" autoFocus
                                   label={msg("loginOtpOneTime")}/>
                    </div>

                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                            <div className={getClassName("kcFormOptionsWrapperClass")}/>
                        </div>

                        <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                            <LoadingClickButton
                                fullWidth
                                name="login"
                                id="kc-login"
                                type="submit"
                                value={msgStr("doLogIn")}
                                variant={"contained"}
                                color={"secondary"}
                                disabled={!otpState && otpLogin.userOtpCredentials.length > 1}
                            >{msgStr("doLogIn")}</LoadingClickButton>
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}

declare const $: any;

function evaluateInlineScript() {
    $(document).ready(function () {
        // Card Single Select
        $(".card-pf-view-single-select").click(function (this: any) {
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                console.log($(this).children())
                $(this).children().removeAttr("name");
            } else {
                $(".card-pf-view-single-select").removeClass("active");
                $(".card-pf-view-single-select").children().removeAttr("name");
                $(this).addClass("active");
                $(this).children().attr("name", "selectedCredentialId");
            }
        });

        var defaultCred = $(".card-pf-view-single-select")[0];
        if (defaultCred) {
            defaultCred.click();
        }
    });
}
