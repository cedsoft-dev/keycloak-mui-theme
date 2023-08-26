import {Button, Stack, TextField} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginUpdateProfile(props) {

    const {kcContext} = props;

    const {t} = useTranslation();

    const {url, user, isAppInitiatedAction} = kcContext;

    function renderUsername() {
        if (user.editUsernameAllowed) {
            return (
                <TextField
                    type={"username"}
                    name={"username"}
                    defaultValue={user.username ?? ""}
                    label={t("username")}
                />
            )
        }
    }

    function renderEmail() {
        return (
            <TextField type={"email"} name={"email"} defaultValue={user.email ?? ""} label={t("email")}/>
        )
    }

    function renderFirstName() {
        return (
            <TextField type={"text"} name={"firstName"} defaultValue={user.firstName ?? ""} label={t("firstName")}/>
        )
    }

    function renderLastName() {
        return (
            <TextField type={"text"} name={"lastName"} defaultValue={user.lastName ?? ""} label={t("lastName")}/>
        )
    }

    function renderActionButtons() {
        let content = <Button type={"submit"} color={"secondary"} variant={"contained"}>{t("doSubmit")}</Button>
        if (isAppInitiatedAction) {
            content = (
                <>
                    <Button type={"submit"} color={"secondary"} variant={"contained"}
                            size={"large"}>{t("doSubmit")}</Button>
                    <Button type={"submit"} name={"cancel-aia"} value={"true"}>{t("doCancel")}</Button>
                </>
            )
        }
        return content;
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            headerNode={t("loginProfileTitle")}
        >
            <form
                id="kc-update-profile-form"
                action={url.loginAction}
                method="post"
            >
                <Stack spacing={2}>
                    {renderUsername()}
                    {renderEmail()}
                    {renderFirstName()}
                    {renderLastName()}
                    {renderActionButtons()}
                </Stack>
            </form>
        </Wrapper>
    );
}

export default LoginUpdateProfile;
