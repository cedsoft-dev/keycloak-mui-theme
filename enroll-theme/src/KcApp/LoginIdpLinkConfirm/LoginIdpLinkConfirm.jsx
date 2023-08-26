import {Button, Stack} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginIdpLinkConfirm(props) {
    const {kcContext} = props;
    const {url, idpAlias} = kcContext;

    const {t} = useTranslation();


    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            headerNode={t("confirmLinkIdpTitle")}
        >
            <form id="kc-register-form" action={url.loginAction} method="post">
                <Stack spacing={2}>
                    <Button
                        type={"submit"}
                        name={"submitAction"}
                        value={"linkAccount"}
                        variant={"contained"}
                        color={"secondary"}
                        size={"large"}
                    >
                        {t("confirmLinkIdpContinue", idpAlias)}
                    </Button>
                    <Button
                        type={"submit"}
                        name={"submitAction"}
                        value={"updateProfile"}
                    >
                        {t("confirmLinkIdpReviewProfile")}
                    </Button>
                </Stack>
            </form>
        </Wrapper>
    );
}

export default LoginIdpLinkConfirm;
