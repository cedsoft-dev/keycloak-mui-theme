import {assert} from "keycloakify/tools/assert";
import {clsx} from "keycloakify/tools/clsx";
import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import {KcContext} from "../../kcContext";
import {I18n} from "../../i18n";
import {
    Alert,
    Box,
    Container,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    Typography,
    useMediaQuery,
    useTheme
} from "@mui/material";
import {Language} from "@mui/icons-material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {
        displayInfo = false,
        displayMessage = true,
        displayRequiredFields = false,
        displayWide = false,
        showAnotherWayIfPresent = true,
        headerNode,
        showUsernameNode = null,
        infoNode = null,
        kcContext,
        i18n,
        doUseDefaultCss,
        classes,
        children
    } = props;

    const {getClassName} = useGetClassName({doUseDefaultCss, classes});

    const {msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;

    const {realm, locale, auth, url, message, isAppInitiatedAction} = kcContext;

    const {isReady} = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesCommonPath}/lib/zocial/zocial.css`,
        ],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": undefined
    });
    const theme = useTheme();
    const isLargerMobile = useMediaQuery(theme.breakpoints.up('sm'));

    if (!isReady) {
        return null;
    }

    function renderStuff() {
        if (!(auth !== undefined && auth.showUsername && !auth.showResetCredentials)) {
            if (displayRequiredFields) {
                return (
                    <div className={getClassName("kcContentWrapperClass")}>
                        <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                    <span className="subtitle">
                                        <span className="required">*</span>
                                        {msg("requiredFields")}
                                    </span>
                        </div>
                        <div className="col-md-10">
                            <Typography variant={"h3"}>{headerNode}</Typography>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Typography variant={"h3"}>{headerNode}</Typography>
                )
            }
        } else {
            if (displayRequiredFields) {
                return (
                    <div className={getClassName("kcContentWrapperClass")}>
                        <div className={clsx(getClassName("kcLabelWrapperClass"), "subtitle")}>
                                <span className="subtitle">
                                    <span className="required">*</span> {msg("requiredFields")}
                                </span>
                        </div>
                        <div className="col-md-10">
                            {showUsernameNode}
                            <div className={getClassName("kcFormGroupClass")}>
                                <div id="kc-username">
                                    <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                    <a id="reset-login" href={url.loginRestartFlowUrl}>
                                        <div className="kc-login-tooltip">
                                            <i className={getClassName("kcResetFlowIcon")}></i>
                                            <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <>
                        {showUsernameNode}
                        <div className={getClassName("kcFormGroupClass")}>
                            <div id="kc-username">
                                <label id="kc-attempted-username">{auth?.attemptedUsername}</label>
                                <a id="reset-login" href={url.loginRestartFlowUrl}>
                                    <div className="kc-login-tooltip">
                                        <i className={getClassName("kcResetFlowIcon")}></i>
                                        <span className="kc-tooltip-text">{msg("restartLoginTooltip")}</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </>
                )
            }
        }
    }

    function renderClientName() {
        if (kcContext?.client?.name || kcContext?.client?.clientId) {
            let content;
            if (kcContext?.client?.name) {
                content = kcContext?.client?.name
            }
            if (kcContext?.client?.clientId) {
                content = kcContext?.client?.clientId;
            }
            return <Typography
                sx={{pt: 3, pb: 4, color: "primary.contrastText"}}>{msg("continueTo")} {content}</Typography>
        }
        return null;
    }

    function renderMessage() {
        /* App-initiated actions should not see warning messages about the need to complete the action during login. */
        if (displayMessage && message !== undefined && (message.type !== "warning" || !isAppInitiatedAction)) {
            return (
                <Alert severity={message.type} children={message.summary}/>
            )
        }
    }

    function renderTryAnotherWay() {
        if (auth !== undefined && auth.showTryAnotherWayLink && showAnotherWayIfPresent) {
            return (
                <form
                    id="kc-select-try-another-way-form"
                    action={url.loginAction}
                    method="post"
                    className={clsx(displayWide && getClassName("kcContentWrapperClass"))}
                >
                    <div
                        className={clsx(
                            displayWide && [getClassName("kcFormSocialAccountContentClass"), getClassName("kcFormSocialAccountClass")]
                        )}
                    >
                        <div className={getClassName("kcFormGroupClass")}>
                            <input type="hidden" name="tryAnotherWay" value="on"/>
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a
                                href="#"
                                id="try-another-way"
                                onClick={() => {
                                    document.forms["kc-select-try-another-way-form" as never].submit();
                                    return false;
                                }}
                            >
                                {msg("doTryAnotherWay")}
                            </a>
                        </div>
                    </div>
                </form>
            )
        }
    }

    function renderDisplayInfo() {
        if (!displayInfo) {
            return
        }

        return (
            <div id="kc-info" className={getClassName("kcSignUpClass")}>
                <div id="kc-info-wrapper" className={getClassName("kcInfoAreaWrapperClass")}>
                    {infoNode}
                </div>
            </div>
        )
    }

    function renderLocalization() {
        if (realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1) {
            return (
                <Box sx={{
                    display: "flex", alignItems: "center"
                }}>
                    <Language fontSize={"large"}
                              style={{paddingRight: "1rem", color: theme.palette.primary.contrastText}}/>
                    <FormControl fullWidth>
                        <InputLabel id="language-select-label"
                                    sx={{color: theme.palette.primary.contrastText, opacity: ".65"}}
                                    color={"secondary"}>{msg("locale")}</InputLabel>

                        <Select
                            value={currentLanguageTag}
                            onChange={(kcTag) => {
                                changeLocale(kcTag.target.value)
                            }}
                            label={msg("locale")}
                            labelId={"language-select-label"}
                            fullWidth
                            size={"small"}
                            sx={{
                                color: theme.palette.primary.contrastText,
                                borderColor: theme.palette.primary.contrastText,
                                '.MuiOutlinedInput-notchedOutline': {
                                    borderColor: theme.palette.primary.contrastText,
                                },
                                '.MuiSvgIcon-root ': {
                                    fill: theme.palette.primary.contrastText + " !important",
                                }
                            }
                            }
                        >
                            {locale.supported.map(({languageTag}) => (
                                <MenuItem value={languageTag} key={languageTag}>
                                    {labelBySupportedLanguageTag[languageTag]}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            )
        }
    }


    function renderContent() {
        return <Box>
            <Paper elevation={5} sx={isLargerMobile ? {mt: 3, mb: 3} : {}}>
                <Grid container style={{height: "100%"}}>
                    <Grid item md={4} xs={12} sx={{
                        background: `linear-gradient(115deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                        p: 3,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between"
                    }}>
                        <Box/>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            {/* @ts-ignore */}
                            <img src={theme.palette.primary.contrastLogo} style={{height: "auto", width: "12rem"}}
                                 alt={"Logo of company"}/>
                            {renderClientName()}
                        </Box>
                        <Box>
                            {renderLocalization()}
                        </Box>
                    </Grid>
                    <Grid item md={8} xs={12} sx={{p: 3}}>
                        <Container>
                            <Stack spacing={2}>
                                {renderStuff()}
                                {renderMessage()}
                                {children}
                                {renderTryAnotherWay()}
                                {renderDisplayInfo()}
                            </Stack>
                        </Container>
                    </Grid>
                </Grid>
            </Paper>
            <Typography sx={{pt: 2, pb: 2}}>{msg("loginTitleHtml", realm.displayNameHtml)}</Typography>

        </Box>
    }

    if (isLargerMobile) {
        return (
            <Box sx={{
                backgroundColor: theme.palette.background.default,
                color: theme.palette.text.disabled,
                height: "100%"
            }}>
                <Container style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                    {renderContent()}
                </Container>
            </Box>
        );

    }

    return <Box style={{backgroundColor: theme.palette.background.default, height: "100%"}}>
        {renderContent()}
    </Box>

}
