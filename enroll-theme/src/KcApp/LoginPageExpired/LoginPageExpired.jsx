import {Link, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function LoginPageExpired(props) {
    const {kcContext} = props
    const {url} = kcContext;

    const {t} = useTranslation();

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            headerNode={t("pageExpiredTitle")}
        >
            <>
                <Typography variant={"body1"}>
                    {t("pageExpiredMsg1")} <Link href={url.loginRestartFlowUrl}>{t("doClickHere")}</Link>.
                </Typography>
                <Typography variant={"body1"}>
                    {t("pageExpiredMsg2")} <Link href={url.loginAction}>{t("doClickHere")}.</Link>
                </Typography>
            </>
        </Wrapper>
    );
}

export default LoginPageExpired;
