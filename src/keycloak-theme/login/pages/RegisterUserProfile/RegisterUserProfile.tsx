// ejected using 'npx eject-keycloak-page'
import {useState} from "react";
import {UserProfileFormFields} from "../shared/UserProfileFormFields";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function RegisterUserProfile(props: PageProps<Extract<KcContext, {
    pageId: "register-user-profile.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {url, messagesPerField, recaptchaRequired, recaptchaSiteKey} = kcContext;

    const {msg, msgStr} = i18n;

    const [isFormSubmittable, setIsFormSubmittable] = useState(false);

    return (
        <Template
            {...{kcContext, i18n, doUseDefaultCss, classes}}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields={true}
            headerNode={msg("registerTitle")}
        >
            <form id="kc-register-form" className={getClassName("kcFormClass")} action={url.registrationAction}
                  method="post">
                <Stack spacing={2}>
                <UserProfileFormFields
                    kcContext={kcContext}
                    onIsFormSubmittableValueChange={setIsFormSubmittable}
                    i18n={i18n}
                    getClassName={getClassName}
                />
                {recaptchaRequired && (
                    <div className="form-group">
                        <div className={getClassName("kcInputWrapperClass")}>
                            <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}/>
                        </div>
                    </div>
                )}
                <div className={getClassName("kcFormGroupClass")} style={{"marginBottom": 30}}>
                    <LoadingClickButton href={url.loginUrl} fullWidth>{msg("backToLogin")}</LoadingClickButton>

                    <LoadingClickButton type={"submit"} value={msgStr("doRegister")} fullWidth disabled={!isFormSubmittable}
                            variant={"contained"} color={"secondary"}>{msgStr("doRegister")}</LoadingClickButton>
                </div>
                </Stack>
            </form>
        </Template>
    );
}
