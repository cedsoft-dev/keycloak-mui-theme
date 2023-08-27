import "./KcApp.css";
import {lazy, Suspense} from "react";
import Fallback, {type PageProps} from "keycloakify/login";
import type {KcContext} from "./kcContext";
import {useI18n} from "./i18n";
import Error from "./pages/Error/Error";
import IdpReviewUserProfile from "./pages/IdpReviewUserProfile/IdpReviewUserProfile";
import LoginConfigTotp from "./pages/LoginConfigTotp/LoginConfigTotp";
import LoginIdpLinkConfirm from "./pages/LoginIdpLinkConfirm/LoginIdpLinkConfirm";
import LoginIdpLinkEmail from "./pages/LoginIdpLinkEmail/LoginIdpLinkEmail";
import LoginOtp from "./pages/LoginOtp/LoginOtp";
import LoginPageExpired from "./pages/LoginPageExpired/LoginPageExpired";
import LoginPassword from "./pages/LoginPassword/LoginPassword";
import LoginResetPassword from "./pages/LoginResetPassword/LoginResetPassword";
import LoginUpdatePassword from "./pages/LoginUpdatePassword/LoginUpdatePassword";
import LoginUpdateProfile from "./pages/LoginUpdateProfile/LoginUpdateProfile";
import LoginUsername from "./pages/LoginUsername/LoginUsername";
import LoginVerifyEmail from "./pages/LoginVerifyEmail/LoginVerifyEmail";
import LogoutConfirm from "./pages/LogoutConfirm/LogoutConfirm";
import SamlPostForm from "./pages/SamlPostForm/SamlPostForm";
import SelectAuthenticator from "./pages/SelectAuthenticator/SelectAuthenticator";
import UpdateEmail from "./pages/UpdateEmail/UpdateEmail";
import UpdateUserProfile from "./pages/UpdateUserProfile/UpdateUserProfile";
import WebauthnAuthenticate from "./pages/WebauthnAuthenticate/WebauthnAuthenticate";

const Template = lazy(() => import("./Template"));
const DefaultTemplate = lazy(() => import("keycloakify/login/Template"));

// You can uncomment this to see the values passed by the main app before redirecting.
//import { foo, bar } from "./valuesTransferredOverUrl";
//console.log(`Values passed by the main app in the URL parameter:`, { foo, bar });

const Login = lazy(() => import("./pages/Login/Login"));
// If you can, favor register-user-profile.ftl over register.ftl, see: https://docs.keycloakify.dev/realtime-input-validation
const Register = lazy(() => import("./pages/Register/Register"));
const RegisterUserProfile = lazy(() => import("./pages/RegisterUserProfile/RegisterUserProfile"));
const Terms = lazy(() => import("./pages/Terms/Terms"));
const MyExtraPage1 = lazy(() => import("./pages/MyExtraPage1"));
const MyExtraPage2 = lazy(() => import("./pages/MyExtraPage2"));
const Info = lazy(() => import("keycloakify/login/pages/Info"));

// This is like adding classes to theme.properties
// https://github.com/keycloak/keycloak/blob/11.0.3/themes/src/main/resources/theme/keycloak/login/theme.properties
const classes: PageProps<any, any>["classes"] = {
    // NOTE: The classes are defined in ./KcApp.css
    //"kcHtmlClass": "my-root-class",
    //"kcHeaderWrapperClass": "my-color my-font"
};

export default function KcApp(props: { kcContext: KcContext; }) {

    const {kcContext} = props;

    const i18n = useI18n({kcContext});

    if (i18n === null) {
        //NOTE: Text resources for the current language are still being downloaded, we can't display anything yet.
        //We could display a loading progress but it's usually a matter of milliseconds.
        return null;
    }

    /*
    * Examples assuming i18n.currentLanguageTag === "en":
    * i18n.msg("access-denied") === <span>Access denied</span>
    * i18n.msg("foo") === <span>foo in English</span>
    */

    return (
        <Suspense>
            {(() => {
                switch (kcContext.pageId) {
                    case "error.ftl":
                        return <Error {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>
                    case "idp-review-user-profile.ftl":
                        return <IdpReviewUserProfile {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>
                    case "login.ftl":
                        return <Login {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-config-totp.ftl":
                        return <LoginConfigTotp {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-idp-link-confirm.ftl":
                        return <LoginIdpLinkConfirm {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-idp-link-email.ftl":
                        return <LoginIdpLinkEmail {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-otp.ftl":
                        return <LoginOtp {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-page-expired.ftl":
                        return <LoginPageExpired {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-password.ftl":
                        return <LoginPassword {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-reset-password.ftl":
                        return <LoginResetPassword {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-update-password.ftl":
                        return <LoginUpdatePassword {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-update-profile.ftl":
                        return <LoginUpdateProfile {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-username.ftl":
                        return <LoginUsername {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "login-verify-email.ftl":
                        return <LoginVerifyEmail {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "logout-confirm.ftl":
                        return <LogoutConfirm {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "register.ftl":
                        return <Register {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "register-user-profile.ftl":
                        return <RegisterUserProfile {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>
                    case "saml-post-form.ftl":
                        return <SamlPostForm {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "select-authenticator.ftl":
                        return <SelectAuthenticator {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "terms.ftl":
                        return <Terms {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "update-email.ftl":
                        return <UpdateEmail {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "update-user-profile.ftl":
                        return <UpdateUserProfile {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "webauthn-authenticate.ftl":
                        return <WebauthnAuthenticate {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "my-extra-page-1.ftl":
                        return <MyExtraPage1 {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    case "my-extra-page-2.ftl":
                        return <MyExtraPage2 {...{kcContext, i18n, Template, classes}} doUseDefaultCss={true}/>;
                    // We choose to use the default Template for the Info page and to download the theme resources.
                    case "info.ftl":
                        return <Info {...{kcContext, i18n, classes}} Template={DefaultTemplate}
                                     doUseDefaultCss={true}/>;
                    default:
                        return <Fallback {...{kcContext, i18n, classes}} Template={Template} doUseDefaultCss={true}/>;
                }
            })()}
        </Suspense>
    );

}
