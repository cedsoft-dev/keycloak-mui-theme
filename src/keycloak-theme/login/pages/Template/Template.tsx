import {assert} from "keycloakify/tools/assert";
import {clsx} from "keycloakify/tools/clsx";
import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/login/TemplateProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import {KcContext} from "../../kcContext";
import {I18n} from "../../i18n";
import {Alert, Container, Grid, Paper, Typography, useMediaQuery, useTheme} from "@mui/material";

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
        url,
        "stylesCommon": [
            "node_modules/patternfly/dist/css/patternfly.min.css",
            "node_modules/patternfly/dist/css/patternfly-additions.min.css",
            "lib/zocial/zocial.css"
        ],
        "styles": ["css/login.css"],
        "htmlClassName": getClassName("kcHtmlClass"),
        "bodyClassName": undefined
    });
    const theme = useTheme();
    const isLargerMobile = useMediaQuery(theme.breakpoints.up('sm'));

    if (!isReady) {
        return null;
    }

    function renderInternationalization() {
        if (realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1) {
            return (
                <div id="kc-locale">
                    <div id="kc-locale-wrapper" className={getClassName("kcLocaleWrapperClass")}>
                        <div className="kc-dropdown" id="kc-locale-dropdown">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a href="#" id="kc-current-locale-link">
                                {labelBySupportedLanguageTag[currentLanguageTag]}
                            </a>
                            <ul>
                                {locale.supported.map(({languageTag}) => (
                                    <li key={languageTag} className="kc-dropdown-item">
                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                        <a href="#" onClick={() => changeLocale(languageTag)}>
                                            {labelBySupportedLanguageTag[languageTag]}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }
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
                            <Typography variant={"h1"}>{headerNode}</Typography>
                        </div>
                    </div>
                )
            } else {
                return (
                    <Typography variant={"h1"}>{headerNode}</Typography>
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

    function renderContent() {
        return <>
            <div id="kc-header" className={getClassName("kcHeaderClass")}>
                <div id="kc-header-wrapper" className={getClassName("kcHeaderWrapperClass")}>
                    {msg("loginTitleHtml", realm.displayNameHtml)}
                </div>
            </div>
            <Paper elevation={5}>
                <Grid container>
                    <Grid item md={4} xs={12} sx={{backgroundColor: theme.palette.primary.main, p: 3}}>
                    </Grid>
                    <Grid item md={8} xs={12} sx={{p:3}}>
                        <Container>
                            <div>
                                {renderInternationalization()}
                                {renderStuff()}
                            </div>
                            <div>
                                {renderMessage()}
                                {children}
                                {renderTryAnotherWay()}
                                {renderDisplayInfo()}
                            </div>
                        </Container>
                    </Grid>

                </Grid>
            </Paper>
        </>
    }

    if (isLargerMobile) {

        return (
            <Container style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center"}}>
                {renderContent()}
            </Container>
        );

    }

    return renderContent()

}
