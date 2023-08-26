import Login from "./Login/Login";
import Register from "./Register";
import Error from "./Error/Error";
import Info from "./Info/Info";
import KcAppBase from "keycloakify";

import {CssBaseline, ThemeProvider, useMediaQuery} from "@mui/material";
import LightTheme from "../components/theme/LightTheme";
import DarkTheme from "../components/theme/DarkTheme";
import RegisterUserProfile from "./RegisterUserProfile/RegisterUserProfile";
import LoginResetPassword from "./LoginResetPassword/LoginResetPassword";
import LoginUpdatePassword from "./LoginResetPassword/LoginResetPassword";
import LoginVerifyEmail from "./LoginVerifyEmail/LoginVerifyEmail";
import LoginOtp from "./LoginOtp/LoginOtp";
import LoginUpdateProfile from "./LoginUpdateProfile/LoginUpdateProfile";
import LoginIdpLinkConfirm from "./LoginIdpLinkConfirm/LoginIdpLinkConfirm";
import LoginPageExpired from "./LoginPageExpired/LoginPageExpired";

function KcApp(props) {

    const {
        kcContext
    } = props;

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    console.debug(kcContext)

    function getCurrentComponent() {
        switch (kcContext.pageId) {
            case "login.ftl":
                return <Login {...{kcContext, ...props}} />;
            case "register.ftl":
                return <Register {...{kcContext, ...props}} />;
            case "register-user-profile.ftl":
                return <RegisterUserProfile {...{kcContext, ...props}} />;
            case "info.ftl":
                return <Info {...{kcContext, ...props}} />;
            case "error.ftl":
                return <Error {...{kcContext, ...props}} />;
            case "login-reset-password.ftl":
                return <LoginResetPassword {...{kcContext, ...props}} />;
            case "login-verify-email.ftl":
                return <LoginVerifyEmail {...{kcContext, ...props}} />;
            case "login-otp.ftl":
                return <LoginOtp {...{kcContext, ...props}} />;
            case "login-update-password.ftl":
                return <LoginUpdatePassword {...{kcContext, ...props}} />;
            case "login-update-profile.ftl":
                return <LoginUpdateProfile {...{kcContext, ...props}} />;
            case "login-idp-link-confirm.ftl":
                return <LoginIdpLinkConfirm {...{kcContext, ...props}} />;
            case "login-page-expired.ftl":
                return <LoginPageExpired {...{kcContext, ...props}} />;
            default:
                return <KcAppBase {...{kcContext, ...props}}/>
        }
    }

    let theme = LightTheme;
    if (prefersDarkMode) {
        theme = DarkTheme;
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <div style={{height: "100%", width: "100%"}}>
                {getCurrentComponent()}
            </div>
        </ThemeProvider>
    )
}

export default KcApp;
