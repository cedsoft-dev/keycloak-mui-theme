import {Link, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginVerifyEmail(props) {
    const {kcContext} = props;
    const {t} = useTranslation();


    const {url} = kcContext;

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            headerNode={t("emailVerifyTitle")}
        >
            <>
                <Typography variant={"body1"}>{t("emailVerifyInstruction1")}</Typography>
                <Typography variant={"body1"}>
                    {t("emailVerifyInstruction2")} <Link
                    href={url.loginAction}>{t("doClickHere")}</Link> {t("emailVerifyInstruction3")}
                </Typography>
            </>
        </Wrapper>
    );
}

export default LoginVerifyEmail;
