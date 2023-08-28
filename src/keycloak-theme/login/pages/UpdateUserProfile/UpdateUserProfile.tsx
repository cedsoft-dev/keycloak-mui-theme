import {useState} from "react";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack} from "@mui/material";
import {UserProfileFormFields} from "../shared/UserProfileFormFields";

export default function UpdateUserProfile(props: PageProps<Extract<KcContext, {
    pageId: "update-user-profile.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {msg, msgStr} = i18n;

    const {url, isAppInitiatedAction} = kcContext;

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginProfileTitle")}>
            <form id="kc-update-profile-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <Stack spacing={2}>
                    <UserProfileFormFields
                        kcContext={kcContext}
                        onIsFormSubmittableValueChange={setIsFomSubmittable}
                        i18n={i18n}
                        getClassName={getClassName}
                    />

                    <div className={getClassName("kcFormGroupClass")}>
                        <div id="kc-form-options" className={getClassName("kcFormOptionsClass")}>
                            <div className={getClassName("kcFormOptionsWrapperClass")}></div>
                        </div>

                        <div id="kc-form-buttons" className={getClassName("kcFormButtonsClass")}>
                            {isAppInitiatedAction ? (
                                <>
                                    <Button
                                        type="submit"
                                        value={msgStr("doSubmit")}
                                        variant={"contained"}
                                        color={"secondary"}
                                    >
                                        {msgStr("doSubmit")}
                                    </Button>
                                    <Button
                                        type="submit"
                                        name={"cancel-aia"}
                                        value={"true"}
                                        formNoValidate
                                    >
                                        {msgStr("doCancel")}
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    type="submit"
                                    defaultValue={msgStr("doSubmit")}
                                    variant={"contained"}
                                    color={"secondary"}
                                    disabled={!isFomSubmittable}
                                    fullWidth
                                >
                                    {msgStr("doSubmit")}
                                </Button>
                            )}
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
