//import {Template} from "keycloakify/lib/components/Template";
import {Button, Grid, Link, Stack, TextField} from "@mui/material";
import Wrapper from "../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function Register(props) {

    const {kcContext} = props;

    const {
        url,
        register,
        realm,
        passwordRequired,
        recaptchaRequired,
        recaptchaSiteKey
    } = kcContext;

    const {t} = useTranslation();


    function renderFirstName() {

        return (
            <>
                <TextField
                    fullWidth
                    label={t("firstName")}
                    type={"text"}
                    name={"firstName"}
                    defaultValue={register.formData.firstName ?? ""}
                />
            </>

        )

    }

    function renderLastName() {
        return (
            <>
                <TextField
                    fullWidth
                    label={t("lastName")}
                    type={"text"}
                    name={"lastName"}
                    defaultValue={register.formData.lastName ?? ""}
                />
            </>
        )
    }

    function renderEmail() {
        return (
            <>
                <TextField
                    label={t("email")}
                    type={"text"}
                    name={"email"}
                    defaultValue={register.formData.email ?? ""}
                    autoComplete={"email"}
                />
            </>
        )
    }

    function renderUsername() {
        if (!realm.registrationEmailAsUsername) {
            return (
                <>
                    <TextField
                        label={t("username")}
                        type={"text"}
                        name={"username"}
                        defaultValue={register.formData.username ?? ""}
                        autoComplete={"username"}
                    />
                </>
            )
        }
    }

    function renderPassword() {
        if (passwordRequired) {
            return (
                <>
                    <TextField
                        label={t("password")}
                        type={"password"}
                        name={"password"}
                        autoComplete={"new-password"}
                    />
                    <TextField
                        label={t("passwordConfirm")}
                        type={"password"}
                        name={"password-confirm"}
                    />
                </>
            )
        }
    }

    function renderRecaptcha() {
        if (recaptchaRequired) {
            return (
                <div className="form-group">
                    <div>
                        <div className="g-recaptcha" data-size="compact" data-sitekey={recaptchaSiteKey}></div>
                    </div>
                </div>
            )
        }
    }

    function renderActionButtons() {
        return (
            <>
                <Button
                    type={"submit"}
                    value={t("doRegister")}
                    color={"secondary"}
                    variant={"contained"}
                >
                    {t("doRegister")}
                </Button>
                <Button component={Link} href={url.loginUrl}>{t("backToLogin")}</Button>

            </>
        )
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            headerNode={t("registerTitle")}
        >
            <form
                id="kc-register-form"
                action={url.registrationAction}
                method="post"
            >
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            {renderFirstName()}
                        </Grid>
                        <Grid item xs={12} md={6}>
                            {renderLastName()}
                        </Grid>
                    </Grid>
                    {renderEmail()}
                    {renderUsername()}
                    {renderPassword()}
                    {renderRecaptcha()}
                    {renderActionButtons()}
                </Stack>
            </form>
        </Wrapper>
    );
}

export default Register;
