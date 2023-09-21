import {useState} from "react";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {UserProfileFormFields} from "../shared/UserProfileFormFields";
import {Button, Stack} from "@mui/material";

export default function IdpReviewUserProfile(props: PageProps<Extract<KcContext, {
    pageId: "idp-review-user-profile.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {msg, msgStr} = i18n;

    const {url} = kcContext;

    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginIdpReviewProfileTitle")}>
            <form id="kc-idp-review-profile-form" className={getClassName("kcFormClass")} action={url.loginAction}
                  method="post">
                <Stack spacing={2}>
                    <UserProfileFormFields
                        kcContext={kcContext}
                        onIsFormSubmittableValueChange={setIsFomSubmittable}
                        i18n={i18n}
                        getClassName={getClassName}
                    />
                    <Button
                        type="submit"
                        value={msgStr("doSubmit")}
                        disabled={!isFomSubmittable}
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                    >{msgStr("doSubmit")}</Button>
                </Stack>
            </form>
        </Template>
    );
}
