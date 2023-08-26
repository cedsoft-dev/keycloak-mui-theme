import {Fragment, useState} from "react";
import {useFormValidationSlice} from "keycloakify/lib/useFormValidationSlice";
import {Button, Divider, Link, Stack, TextField, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function RegisterUserProfile(props) {
    const {kcContext} = props;
    const {url, messagesPerField, recaptchaRequired, recaptchaSiteKey} = kcContext;

    const {t} = useTranslation();


    const [isFomSubmittable, setIsFomSubmittable] = useState(false);

    function renderRecaptcha() {
        if (recaptchaRequired) {
            return (
                <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}/>
            )
        }
    }

    function renderBackToLogin() {
        return (
            <Button fullWidth href={url.loginUrl} component={Link}>{t("backToLogin")}</Button>
        )
    }

    function renderDoRegister() {
        return (
            <Button
                fullWidth type="submit"
                value={t("doRegister")}
                disabled={!isFomSubmittable}
                color={"secondary"}
                variant={"contained"}
                size={"large"}
            >
                {t("doRegister")}
            </Button>
        )
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            displayMessage={messagesPerField.exists("global")}
            displayRequiredFields={true}
            doFetchDefaultThemeResources={true}
            headerNode={t("registerTitle")}
        >
            <form
                id="kc-register-form"
                action={url.registrationAction}
                method="post"
            >
                <Stack spacing={2}>
                    <UserProfileFormFields
                        kcContext={kcContext}
                        onIsFormSubmittableValueChange={setIsFomSubmittable}
                        {...props}
                    />
                    {renderRecaptcha()}
                    {renderDoRegister()}
                    {renderBackToLogin()}
                </Stack>
            </form>
        </Wrapper>
    );
}

function UserProfileFormFields(props) {
    const {kcContext} = props;
    const {t} = useTranslation();

    const {
        formValidationState: {fieldStateByAttributeName},
        attributesWithPassword,
    } = useFormValidationSlice({
        kcContext,
    });

    let currentGroup = "";

    function renderInput(attribute, displayableErrors, value) {
        return (
            <TextField
                required={attribute.required}
                error={displayableErrors.length > 0}
                helperText={displayableErrors.map(error => error.errorMessageStr).join(", ")}
                id={attribute.name}
                name={attribute.name}
                defaultValue={value}
                aria-invalid={displayableErrors.length !== 0}
                disabled={attribute.readOnly}
                autoComplete={attribute.autocomplete}
                label={t(attribute.displayName.substring(2).slice(0, -1))}
                type={(() => {
                    switch (attribute.name) {
                        case "password-confirm":
                        case "password":
                            return "password";
                        default:
                            return "text";
                    }
                })()}
                fullWidth
            />
        )
    }

    function renderDivider(group, groupDisplayHeader, groupDisplayDescription) {
        let content;
        if (group !== currentGroup && (currentGroup = group) !== "") {
            content = (
                <>
                    <Divider>{t(groupDisplayHeader) || currentGroup}</Divider>
                </>
            )
        }

        if (groupDisplayDescription) {
            content.push(
                <Typography
                    gutterBottom
                    variant={"subtitle1"}
                >
                    {t(groupDisplayDescription)}
                </Typography>
            )
        }
        return content;
    }

    return (
        <Stack spacing={2}>
            {attributesWithPassword.map((attribute, i) => {
                const {group = "", groupDisplayHeader = "", groupDisplayDescription = ""} = attribute;
                const {value, displayableErrors} = fieldStateByAttributeName[attribute.name];
                return (
                    <Fragment key={i}>
                        {renderDivider(group, groupDisplayHeader, groupDisplayDescription)}
                        {renderInput(attribute, displayableErrors, value)}
                    </Fragment>
                );
            })}
        </Stack>
    );
}

export default RegisterUserProfile;
