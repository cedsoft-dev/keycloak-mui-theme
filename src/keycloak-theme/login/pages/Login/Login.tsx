import {type FormEventHandler, useState} from "react";
import {clsx} from "keycloakify/tools/clsx";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    FormGroup,
    Grid,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {
    Apple,
    CheckBoxOutlineBlank,
    Facebook,
    GitHub,
    Google,
    Instagram,
    LinkedIn,
    Microsoft,
    Twitter
} from "@mui/icons-material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function Login(props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {social, realm, url, usernameHidden, login, auth, registrationDisabled} = kcContext;

    const {msg, msgStr} = i18n;

    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    const onSubmit = useConstCallback<FormEventHandler<HTMLFormElement>>(e => {
        e.preventDefault();

        setIsLoginButtonDisabled(true);

        const formElement = e.target as HTMLFormElement;

        //NOTE: Even if we login with email Keycloak expect username and password in
        //the POST request.
        formElement.querySelector("input[name='email']")?.setAttribute("name", "username");

        formElement.submit();
    });
    const theme = useTheme();
    const isLargerMobile = useMediaQuery(theme.breakpoints.up('sm'));


    function renderInfoNode() {
        if (realm.password && realm.registrationAllowed && !registrationDisabled) {
            return (
                <>
                    <Divider><Typography>{msg("or")}</Typography></Divider>
                    <Button tabIndex={6} href={url.registrationUrl}
                            fullWidth>{msg("noAccount")}&nbsp;{msg("doRegister")}</Button>
                </>
            )
        }
    }


    function getSocialProviderIcon(name: string) {
        switch (name) {
            case "google":
                return <Google/>;
            case "apple":
                return <Apple/>;
            case "linkedin":
                return <LinkedIn/>;
            case "facebook":
                return <Facebook/>;
            case "instagram":
                return <Instagram/>;
            case "microsoft":
                return <Microsoft/>;
            case "twitter":
                return <Twitter/>;
            case "github":
                return <GitHub/>;
            default:
                return <CheckBoxOutlineBlank/>
        }
    }


    return (
        <Template
            {...{kcContext, i18n, doUseDefaultCss, classes}}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={msg("doLogIn")}
            infoNode={renderInfoNode()}
        >
            <div id="kc-form"
                 className={clsx(realm.password && social.providers !== undefined && getClassName("kcContentWrapperClass"))}>
                <div
                    id="kc-form-wrapper"
                    className={clsx(
                        realm.password &&
                        social.providers && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                    )}
                >
                    {realm.password && (
                        <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                            <Stack spacing={2}>
                                {!usernameHidden &&
                                    (() => {
                                        const label = !realm.loginWithEmailAllowed
                                            ? "username"
                                            : realm.registrationEmailAsUsername
                                                ? "email"
                                                : "usernameOrEmail";

                                        const autoCompleteHelper: typeof label = label === "usernameOrEmail" ? "username" : label;

                                        return (
                                            <>
                                                <TextField
                                                    tabIndex={1} id={autoCompleteHelper}
                                                    //NOTE: This is used by Google Chrome auto fill so we use it to tell
                                                    //the browser how to pre fill the form but before submit we put it back
                                                    //to username because it is what keycloak expects.
                                                    name={autoCompleteHelper}
                                                    defaultValue={login.username ?? ""}
                                                    type={"text"}
                                                    autoFocus={true}
                                                    autoComplete={"off"}
                                                    label={msg(label)}
                                                    fullWidth
                                                />
                                            </>
                                        );
                                    })()}
                                <TextField
                                    tabIndex={2}
                                    name={"password"}
                                    type={"password"}
                                    label={msg("password")}
                                    autoComplete={"off"}
                                    fullWidth
                                />
                                <Grid container alignItems={"center"} >
                                    <Grid item xs={12} sm={12} md={6}>
                                        {realm.rememberMe && !usernameHidden && (
                                            <div className="checkbox">
                                                <FormGroup>
                                                    <FormControlLabel
                                                        control={<Checkbox tabIndex={3} id={"rememberMe"}
                                                                           name={"rememberMe"}
                                                                           defaultChecked={login.rememberMe === "on"}/>}
                                                        label={msg("rememberMe")}/>
                                                </FormGroup>
                                            </div>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} style={{display: "flex", justifyContent: "flex-end"}}>
                                        {realm.resetPasswordAllowed && (
                                            <Button tabIndex={5} href={url.loginResetCredentialsUrl} fullWidth={!isLargerMobile}>
                                                {msg("doForgotPassword")}
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>

                                <input
                                    type="hidden"
                                    id="id-hidden-input"
                                    name="credentialId"
                                    {...(auth?.selectedCredential !== undefined
                                        ? {
                                            "value": auth.selectedCredential
                                        }
                                        : {})}
                                />
                                <LoadingClickButton
                                    tabIndex={4}
                                    name={"login"}
                                    id={"kc-login"}
                                    type={"submit"}
                                    value={msgStr("doLogIn")}
                                    disabled={isLoginButtonDisabled}
                                    fullWidth
                                    color={"secondary"}
                                    variant={"contained"}
                                >
                                    {msgStr("doLogIn")}
                                </LoadingClickButton>
                            </Stack>
                        </form>
                    )}
                </div>
                {realm.password && social.providers !== undefined && (
                    <List>
                        {social.providers.map(p => (
                            <ListItemButton>
                                <ListItemIcon>{getSocialProviderIcon(p.providerId)}</ListItemIcon>
                                <ListItemText primary={p.displayName}/>
                            </ListItemButton>
                        ))}
                    </List>
                )}
            </div>
        </Template>
    );
}
