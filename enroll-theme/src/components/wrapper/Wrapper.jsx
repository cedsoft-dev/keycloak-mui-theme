import React from "react";
import {Alert, Button, Container, Grid, Link, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";
import WrapperStyles from "./WrapperStyles";
import kcContext from "../../KcApp/kcContext";
import EnrollWhite from "../../img/EnrollWhite.svg";
import {useTranslation} from "react-i18next";


function Wrapper(props) {
    const wrapperStyles = WrapperStyles()
    const kcContextObj = kcContext.kcContext;
    console.log("KCCONTEXT", kcContext)
    const {realm, auth, url, message, isAppInitiatedAction, client} = kcContextObj;
    const {t} = useTranslation();
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
    const {
        displayMessage = true,
        displayRequiredFields = false,
        showAnotherWayIfPresent = true,
        showUsernameNode = null,
    } = props;


    function renderNoRequiredFields() {
        return (
            <>
                {showUsernameNode}
                <Typography variant={"body1"}>{auth?.attemptedUsername}</Typography>
                <Button component={Link} href={url.loginRestartFlowUrl}>{t("restartLoginTooltip")}</Button>
            </>
        )
    }

    function onTryAnotherWayClick() {
        document.forms["kc-select-try-another-way-form"].submit();
    }

    /*
    function onChangeLanguageClickFactory(languageTag) {
        console.log("updatingLanguageTo", languageTag);
        changeLocale({
            kcContext,
            languageTag
        })
    }

    function renderLocalization() {
        if (realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1) {
            return (
                <div style={{display: "flex", alignItems: "center"}}>
                    <Language fontSize={"large"} style={{paddingRight: "1rem"}}/>
                    <Select
                        value={getCurrentKcLanguageTag(kcContextObj)}
                        onChange={(kcTag) => {
                            onChangeLanguageClickFactory(kcTag.target.value)
                            console.log(kcTag.target.value)
                        }}
                        label="Language"
                        fullWidth
                        variant={"standard"}
                        color={"secondary"}
                        style={{color: "#fff"}}
                    >
                        {locale.supported.map(({languageTag}) => (
                            <MenuItem value={languageTag} key={languageTag}>
                                {getTagLabel({"kcLanguageTag": languageTag, kcContext: kcContextObj})}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
    }

     */

    function renderClientName() {
        console.debug("client Information", client);
        if (client?.name) {
            return client.name
        }
        return client.clientId;
    }

    function renderRootStyles() {
        if (isMobile) {
            return {display: "flex", alignItems: "center", justifyContent: "center", height: "100%"}
        }
        return {}
    }

    function renderPaperClass() {
        if (isMobile) {
            return wrapperStyles.paperRoot
        }
        return ""
    }

    function renderBanner() {
        if (displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction)) {
            /* App-initiated actions should not see warning messages about the need to complete the action during login. */
            return (
                <Alert severity={message.type}
                       style={{marginTop: "1rem", marginBottom: "1rem"}}>{message.summary}</Alert>
            )
        }
    }

    function renderShowTryAnotherWay() {
        if (auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent) {
            return (
                <form
                    id="kc-select-try-another-way-form"
                    action={url.loginAction}
                    method="post"
                >
                    <input type="hidden" name="tryAnotherWay" value="on"/>
                    <Button onClick={onTryAnotherWayClick}>
                        {t("doTryAnotherWay")}
                    </Button>
                </form>
            )
        }
    }

    function renderRequiredFieldsWhenNoAuthOrNoUsernameOrNoPwReset() {

        let content = <></>

        if (displayRequiredFields) {
            content = (
                <>
                    <Typography variant={"subtitle1"}>* {t("requiredFields")}</Typography>
                </>
            )
        }
        return content;
    }

    function renderRequiredFieldsWhenAuthAndUsernameAndShowPwReset() {

        let content = renderNoRequiredFields();

        if (displayRequiredFields) {
            content = (
                <>
                    <Typography variant={"subtitle1"}>* {t("requiredFields")}</Typography>

                    {showUsernameNode}
                    <div>
                        {auth?.attemptedUsername}
                        <Button component={Link} href={url.loginRestartFlowUrl}>{t("restartLoginTooltip")}</Button>
                    </div>
                </>
            );
        }

        return content;

    }

    function renderRequiredFields() {
        let content = renderRequiredFieldsWhenAuthAndUsernameAndShowPwReset();
        if ((auth === undefined || !auth.showUsername || auth.showResetCredentials)) {
            content = renderRequiredFieldsWhenNoAuthOrNoUsernameOrNoPwReset()
        }
        return content;
    }

    return (
        <div style={renderRootStyles()}>
            <Paper className={renderPaperClass()} elevation={10}>
                <Grid container style={{height: "100%"}}>
                    <Grid item sm={4} className={wrapperStyles.brandingSectionRoot} style={{width: "100%"}}>
                        <Grid
                            container
                            direction={"column"}
                            style={{height: "100%", width: "100%"}}
                            alignContent={"center"}
                            justifyContent={"center"}
                        >
                            <Grid
                                item
                                sm={10}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    padding: "2rem"
                                }}
                            >
                                <div>
                                    <div style={{display: "flex", justifyContent: "center", paddingBottom: "1rem"}}>
                                        <img src={EnrollWhite} width={"60%"} alt={"Logo of CedSoft"}/>
                                    </div>
                                    <Typography
                                        variant={"h4"}
                                        align={"center"}
                                        style={{paddingBottom: "2rem"}}
                                    >
                                        {realm.displayName}
                                    </Typography>
                                    <Typography
                                        variant={"body1"}
                                        align={"center"}
                                    >
                                        {t("continueTo", {applicationName: renderClientName()})}
                                    </Typography>
                                </div>
                            </Grid>
                            <Grid item sm={2} style={{
                                display: "flex",
                                alignItems: "center"

                            }}>
                                <Container maxWidth={false}>
                                    {/*renderLocalization()*/}
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item sm={8} style={{
                        padding: "2rem",
                        display: "flex",
                        alignItems: "center",
                        width: "100%"
                    }}>
                        <Container maxWidth={false} fullWidth>
                            {renderRequiredFields()}
                            {renderBanner()}
                            {props.children}
                            {renderShowTryAnotherWay()}
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    )
}

export default Wrapper;
