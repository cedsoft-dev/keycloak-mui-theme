import {Button, Stack, TextField, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginOtp(props) {
    const {kcContext} = props
    const {otpLogin, url} = kcContext;

    const {t} = useTranslation();

    function renderOtpUserLabels() {
        if (otpLogin.userOtpCredentials.length > 1) {
            return otpLogin.userOtpCredentials.map(otpCredential => (
                <div key={otpCredential.id}>
                    <input type="hidden" value={otpCredential.id}/>
                    <Typography variant={"h5"}>{otpCredential.userLabel}</Typography>
                </div>
            ))
        }
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            headerNode={t("doLogIn")}
        >
            <form id="kc-otp-login-form" action={url.loginAction} method="post">
                <Stack spacing={2}>
                    {renderOtpUserLabels()}
                    <TextField
                        name={"otp"}
                        autoComplete={"off"}
                        type={"string"}
                        autoFocus
                        label={t("loginOtpOneTime")}
                    />

                    <Button
                        type={"submit"}
                        variant={"contained"}
                        fullWidth
                        color={"secondary"}
                        name={"login"}
                        size={"large"}
                    >
                        {t("doLogIn")}
                    </Button>
                </Stack>
            </form>
        </Wrapper>
    );
}

export default LoginOtp;
