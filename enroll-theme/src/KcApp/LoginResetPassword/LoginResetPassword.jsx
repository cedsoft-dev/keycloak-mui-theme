import {Button, Link, Stack, TextField} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginResetPassword(props) {
    const {kcContext} = props;
    const {url, realm, auth} = kcContext;

    const {t} = useTranslation();

    function renderUserIdentification() {
        return (
            <TextField
                fullWidth
                type="text"
                name="username"
                autoFocus
                defaultValue={auth !== undefined && auth.showUsername ? auth.attemptedUsername : undefined}
                label={!realm.loginWithEmailAllowed
                    ? t("username")
                    : !realm.registrationEmailAsUsername
                        ? t("usernameOrEmail")
                        : t("email")}
            />
        )
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            infoNode={t("emailInstruction")}
            headerNode={t("emailForgotTitle")}
        >
            <form
                id="kc-reset-password-form"
                action={url.loginAction}
                method="post"
            >
                <Stack spacing={2}>
                    {renderUserIdentification()}
                    <Button
                        type="submit"
                        variant={"contained"}
                        color={"secondary"}
                        fullWidth
                        size={"large"}
                    >
                        {t("doSubmit")}
                    </Button>
                    <Button
                        fullWidth
                        href={url.loginUrl}
                        component={Link}
                    >
                        {t("backToLogin")}
                    </Button>
                </Stack>
            </form>
        </Wrapper>
    );
}

export default LoginResetPassword;
