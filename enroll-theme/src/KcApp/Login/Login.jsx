import {useState} from "react";
import {
    Button,
    Checkbox,
    Divider,
    FormControlLabel,
    Grid,
    Link,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Stack,
    TextField
} from "@mui/material";
import {LoadingButton} from "@mui/lab";
import {Apple, CheckBox, Facebook, Google, Instagram, LinkedIn} from "@mui/icons-material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function Login(props) {
    const {kcContext} = props;
    const {social, realm, url, usernameEditDisabled, login, auth, registrationDisabled} = kcContext;

    const {t} = useTranslation();


    const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

    function onSubmit() {
        setIsLoginButtonDisabled(true)
    }

    function renderResetPassword() {
        if (realm.resetPasswordAllowed) {
            return (
                <Button component={Link} color={"inherit"} fullWidth href={url.loginResetCredentialsUrl}>
                    {t("doForgotPassword")}
                </Button>
            )
        }
    }

    function renderRememberMe() {
        if (realm.rememberMe && !usernameEditDisabled) {
            return (
                <FormControlLabel
                    control={
                        <Checkbox
                            name="rememberMe"
                            defaultChecked={login.rememberMe}
                        />
                    }
                    label={t("rememberMe")}
                />
            )
        }
    }

    function renderUserIdentification() {
        function renderLabel() {
            let content;
            if (!realm.loginWithEmailAllowed) {
                content = t("username");
            } else {
                content = t("email");
                if (!realm.registrationEmailAsUsername) {
                    content = t("usernameOrEmail");
                }
            }
            return content;
        }

        return (
            <TextField
                label={renderLabel()}
                type={"text"}
                name={"username"}
                defaultValue={login.username ?? ""}
                fullWidth
                {...(usernameEditDisabled
                    ? {"disabled": true}
                    : {
                        "autoFocus": true,
                        "autoComplete": "off",
                    })}
            />
        )
    }

    function renderPassword() {
        return (
            <TextField
                label={t("password")}
                type={"password"}
                name={"password"}
                autoComplete={"off"}
                fullWidth
            />
        )
    }

    function renderLoginForm() {
        if (realm.password) {
            return (
                <form id="kc-form-login" onSubmit={onSubmit} action={url.loginAction} method="post">
                    <Stack spacing={2}>
                        {renderUserIdentification()}
                        {renderPassword()}
                        {renderRememberMe()}
                        <input
                            type="hidden"
                            id="id-hidden-input"
                            name="credentialId"
                            {...(auth?.selectedCredential !== undefined
                                ? {
                                    "value": auth.selectedCredential,
                                }
                                : {})}
                        />
                        <LoadingButton
                            variant={"contained"}
                            color={"secondary"}
                            type={"submit"}
                            name={"login"}
                            loading={isLoginButtonDisabled}
                            loadingPosition={"center"}
                            fullWidth
                        >
                            {t("doLogIn")}
                        </LoadingButton>
                        {renderInfoNode()}
                        {renderResetPassword()}
                    </Stack>
                </form>
            )
        }
    }

    function getSocialProviderIcon(name) {
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
            default:
                return <CheckBox/>
        }
    }

    function renderSocialProvider() {
        if (realm.password && social.providers !== undefined) {
            console.debug("debug", social.providers)
            return (
                <List>
                    {social.providers.map(p => (
                        <ListItemButton component={Link} href={p.loginUrl} key={p.providerId}>
                            <ListItemIcon>
                                {getSocialProviderIcon(p.providerId)}
                            </ListItemIcon>
                            <ListItemText primary={t("continueWith", {provider: p.displayName})}/>
                        </ListItemButton>
                    ))}
                </List>
            )
        }
    }

    function renderInfoNode() {
        console.log(realm, registrationDisabled)
        if (realm.password && realm.registrationAllowed && !registrationDisabled) {

            return (
                <div>
                    <Button component={Link} href={url.registrationUrl} fullWidth
                            color={"secondary"}>{t("doRegister")}</Button>
                </div>
            )
        }
    }

    function renderContent() {
        if (realm.password && social.providers !== undefined) {
            return (
                <Grid container>
                    <Grid item xs={12} md={7} zeroMinWidth>
                        {renderLoginForm()}
                    </Grid>
                    <Grid item md={1} style={{display: "flex", justifyContent: "center"}}>
                        <Divider orientation={"vertical"}/>
                    </Grid>
                    <Grid item xs={12} md={4} zeroMinWidth>
                        {renderSocialProvider()}
                    </Grid>
                </Grid>
            )
        }
        return renderLoginForm()

    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayInfo={social.displayInfo}
            displayWide={realm.password && social.providers !== undefined}
            headerNode={t("doLogIn")}
        >
            {renderContent()}
        </Wrapper>
    );
}

export default Login;
