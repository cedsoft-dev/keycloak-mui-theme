import {useEffect} from "react";
import {useKcLanguageTag} from "keycloakify/lib/i18n/useKcLanguageTag";
import {getBestMatchAmongKcLanguageTag, getKcLanguageTagLabel} from "keycloakify/lib/i18n/KcLanguageTag";
import {assert} from "keycloakify/lib/tools/assert";
import {
    Alert,
    Button,
    Container,
    Divider,
    Grid,
    Link,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
    useMediaQuery
} from "@mui/material";
import {Language} from "@mui/icons-material";
import EnrollDay from "../../img/EnrollBlack.svg";
import EnrollNight from "../../img/EnrollWhite.svg";
import TemplateStyles from "./TemplateStyles";
import {useTheme} from "@mui/styles";
import {useTranslation} from "react-i18next";


/*
export type TemplateProps = {
    displayInfo?: boolean;
    displayMessage?: boolean;
    displayRequiredFields?: boolean;
    displayWide?: boolean;
    showAnotherWayIfPresent?: boolean;
    headerNode: ReactNode;
    showUsernameNode?: ReactNode;
    formNode: ReactNode;
    infoNode?: ReactNode;
    /** If you write your own page you probably want
     * to avoid pulling the default theme assets.
     */

/*
    doFetchDefaultThemeResources: boolean;
} & { kcContext: KcContextBase } & KcTemplateProps;
*/
function Template(props) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        formNode,
        infoNode = null,
        kcContext,
    } = props;

    const {t} = useTranslation();

    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
    const templateStyles = TemplateStyles();
    const theme = useTheme();
    const isLargerMobile = useMediaQuery(theme.breakpoints.up('sm'));


    const {kcLanguageTag, setKcLanguageTag} = useKcLanguageTag();

    function onChangeLanguageClickFactory(languageTag) {
        console.log("updatingLanguageTo", languageTag);
        setKcLanguageTag(languageTag)
    }

    function onTryAnotherWayClick() {
        document.forms["kc-select-try-another-way-form"].submit();
    }

    const {realm, locale, auth, url, message, isAppInitiatedAction} = kcContext;

    useEffect(() => {
        if (!realm.internationalizationEnabled) {
            return;
        }

        assert(locale !== undefined);

        if (kcLanguageTag === getBestMatchAmongKcLanguageTag(locale.current)) {
            return;
        }

        window.location.href = locale.supported.find(({languageTag}) => languageTag === kcLanguageTag)?.url;
    }, [kcLanguageTag, locale, realm.internationalizationEnabled]);

    function renderLocalization() {
        if (realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1) {
            return (
                <div style={{display: "flex", alignItems: "center"}}>
                    <Language fontSize={"large"} style={{paddingRight: "1rem"}}/>
                    <Select
                        value={kcLanguageTag}
                        onChange={(kcTag) => {
                            onChangeLanguageClickFactory(kcTag.target.value)
                            console.log(kcTag.target.value)
                        }}
                        label="Language"
                        fullWidth
                    >
                        {locale.supported.map(({languageTag}) => (
                            <MenuItem value={languageTag} key={languageTag}>
                                {getKcLanguageTagLabel(languageTag)}
                            </MenuItem>
                        ))}
                    </Select>
                </div>
            )
        }
    }

    function renderRequiredFields() {
        let content = renderRequiredFieldsWhenAuthAndUsernameAndShowPwReset();
        /* !(auth && auth.showUsername && !auth.showResetCredentials) */
        if ((auth === undefined || !auth.showUsername || auth.showResetCredentials)) {
            content = renderRequiredFieldsWhenNoAuthOrNoUsernameOrNoPwReset()
        }
        return content;
    }

    function renderRequiredFieldsWhenNoAuthOrNoUsernameOrNoPwReset() {

        let content = <Typography variant={"h4"}>{headerNode}</Typography>

        if (displayRequiredFields) {
            content = (
                <>
                    <Typography variant={"h6"}>{headerNode}</Typography>
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

    function renderNoRequiredFields() {
        return (
            <>
                {showUsernameNode}
                <Typography variant={"body1"}>{auth?.attemptedUsername}</Typography>
                <Button component={Link} href={url.loginRestartFlowUrl}>{t("restartLoginTooltip")}</Button>
            </>
        )
    }

    function renderBanner() {
        if (displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction)) {
            /* App-initiated actions should not see warning messages about the need to complete the action during login. */
            return (
                <Alert severity={message.type}>{message.summary}</Alert>
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

    function renderDisplayInfo() {
        if (displayInfo) {
            return (
                <div style={{paddingTop: "1rem", paddingBottom: "1rem"}}>
                    <div style={{paddingBottom: "1rem"}}>
                        <Divider/>
                    </div>
                    {infoNode}
                </div>
            )
        }
    }

    function renderLogo() {
        let logo = EnrollDay;
        if (prefersDarkMode) {
            logo = EnrollNight;
        }
        return logo;
    }

    function renderWrapper() {
        let content = (
            <Paper style={{padding: "2rem"}} elevation={5}>
                <img src={renderLogo()} className={templateStyles.logo} alt={"Logo of cedsoft"}/>
                <Stack spacing={2}>
                    {renderRequiredFields()}
                    {renderBanner()}
                    {formNode}
                    {renderShowTryAnotherWay()}
                    {renderDisplayInfo()}
                    <Grid container spacing={0} alignItems={"center"}>
                        <Grid item xs={12} md={3}>
                            {renderLocalization()}
                        </Grid>
                        <Grid item xs={12} md={6}/>
                        <Grid item xs={12} md={3}>
                            <Typography
                                align={"right"}
                                variant={"body1"}
                            >
                                {t("loginTitleHtml", realm.displayNameHtml)}
                            </Typography>
                        </Grid>

                    </Grid>
                </Stack>
            </Paper>
        )

        if (isLargerMobile) {
            return (
                <Container style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    {content}
                </Container>
            )
        }
        return content;
    }


    return renderWrapper();
}

export default Template;
