// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import { clsx } from "keycloakify/tools/clsx";
import { usePrepareTemplate } from "keycloakify/lib/usePrepareTemplate";
import { type TemplateProps } from "keycloakify/account/TemplateProps";
import { useGetClassName } from "keycloakify/account/lib/useGetClassName";
import type { KcContext } from "./kcContext";
import type { I18n } from "./i18n";
import { assert } from "keycloakify/tools/assert";
import React from "react";
import {Button, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar} from "@mui/material";
import {AccountCircle, Api, Description, Devices, Password, ScreenLockPortrait} from "@mui/icons-material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, active, classes, children } = props;

    const { getClassName } = useGetClassName({ doUseDefaultCss, classes });

    const { msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag } = i18n;

    const { locale, url, features, realm, message, referrer } = kcContext;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const { isReady } = usePrepareTemplate({
        "doFetchDefaultThemeResources": doUseDefaultCss,
        url,
        "stylesCommon": ["node_modules/patternfly/dist/css/patternfly.min.css", "node_modules/patternfly/dist/css/patternfly-additions.min.css"],
        "styles": ["css/account.css"],
        "htmlClassName": undefined,
        "bodyClassName": clsx("admin-console", "user", getClassName("kcBodyClass"))
    });

    if (!isReady) {
        return null;
    }

    /*
    <ul>
                        <li className={clsx(active === "account" && "active")}>
                            <a href={url.accountUrl}>{msg("account")}</a>
                        </li>
                        {features.passwordUpdateSupported && (
                            <li className={clsx(active === "password" && "active")}>
                                <a href={url.passwordUrl}>{msg("password")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "totp" && "active")}>
                            <a href={url.totpUrl}>{msg("authenticator")}</a>
                        </li>
                        {features.identityFederation && (
                            <li className={clsx(active === "social" && "active")}>
                                <a href={url.socialUrl}>{msg("federatedIdentity")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "sessions" && "active")}>
                            <a href={url.sessionsUrl}>{msg("sessions")}</a>
                        </li>
                        <li className={clsx(active === "applications" && "active")}>
                            <a href={url.applicationsUrl}>{msg("applications")}</a>
                        </li>
                        {features.log && (
                            <li className={clsx(active === "log" && "active")}>
                                <a href={url.logUrl}>{msg("log")}</a>
                            </li>
                        )}
                        {realm.userManagedAccessAllowed && features.authorization && (
                            <li className={clsx(active === "authorization" && "active")}>
                                <a href={url.resourceUrl}>{msg("myResources")}</a>
                            </li>
                        )}
                    </ul>
     */

    const drawer = (
            <div>
                <Toolbar/>
                <Divider/>
                <List>
                    <ListItemButton component={"a"} key={"account"} selected={active === "account"} disablePadding href={url.accountUrl}>
                        <ListItemButton>
                            <ListItemIcon>                                <AccountCircle/>
                            </ListItemIcon>
                            <ListItemText primary={msg("account")}/>
                        </ListItemButton>
                    </ListItemButton>
                    {features.passwordUpdateSupported && (
                        <ListItemButton key={"password"} selected={active === "password"} disablePadding href={url.passwordUrl}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Password/>
                                </ListItemIcon>
                                <ListItemText primary={msg("password")}/>
                            </ListItemButton>
                        </ListItemButton>
                    )}
                    <ListItemButton key={"totp"} selected={active === "totp"} disablePadding href={url.totpUrl}>
                        <ListItemButton>
                            <ListItemIcon>
                                <ScreenLockPortrait/>
                            </ListItemIcon>
                            <ListItemText primary={msg("authenticator")}/>
                        </ListItemButton>
                    </ListItemButton>
                    {features.identityFederation && (
                        <ListItemButton key={"social"} selected={active === "social"} disablePadding href={url.socialUrl}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <ScreenLockPortrait/>
                                </ListItemIcon>
                                <ListItemText primary={msg("federatedIdentity")}/>
                            </ListItemButton>
                        </ListItemButton>
                    )}
                    <ListItemButton key={"social"} selected={active === "sessions"} disablePadding href={url.sessionsUrl}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Devices/>
                            </ListItemIcon>
                            <ListItemText primary={msg("sessions")}/>
                        </ListItemButton>
                    </ListItemButton>
                    <ListItemButton key={"applications"} selected={active === "applications"} disablePadding href={url.applicationsUrl}>
                        <ListItemButton>
                            <ListItemIcon>
                                <Api/>
                            </ListItemIcon>
                            <ListItemText primary={msg("applications")}/>
                        </ListItemButton>
                    </ListItemButton>
                    {features.log && (
                        <ListItemButton key={"log"} selected={active === "log"} disablePadding href={url.logUrl}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Description/>
                                </ListItemIcon>
                                <ListItemText primary={msg("log")}/>
                            </ListItemButton>
                        </ListItemButton>
                    )}
                    {realm.userManagedAccessAllowed && features.authorization && (
                        <ListItemButton key={"authorization"} selected={active === "authorization"} disablePadding href={url.resourceUrl}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <Description/>
                                </ListItemIcon>
                                <ListItemText primary={msg("myResources")}/>
                            </ListItemButton>
                        </ListItemButton>
                    )}
            </List>
        </div>
    );

    return (
        <>
            <header className="navbar navbar-default navbar-pf navbar-main header">
                <nav className="navbar" role="navigation">
                    <div className="navbar-header">
                        <div className="container">
                            <h1 className="navbar-title" style={{backgroundImage: "url(https://cedsoft.de/static/media/cedsoftMainWhite.c7507176.svg)"}}>CedSoft</h1>
                        </div>
                    </div>
                    <div className="navbar-collapse navbar-collapse-1">
                        <div className="container">
                            <ul className="nav navbar-nav navbar-utility">
                                {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (
                                    <li>
                                        <div className="kc-dropdown" id="kc-locale-dropdown">
                                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                            <a href="#" id="kc-current-locale-link">
                                                {labelBySupportedLanguageTag[currentLanguageTag]}
                                            </a>
                                            <ul>
                                                {locale.supported.map(({ languageTag }) => (
                                                    <li key={languageTag} className="kc-dropdown-item">
                                                        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                                                        <a href="#" onClick={() => changeLocale(languageTag)}>
                                                            {labelBySupportedLanguageTag[languageTag]}
                                                        </a>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </li>
                                )}
                                {referrer?.url && (
                                    <li>
                                        <a href={referrer.url} id="referrer">
                                            {msg("backTo", referrer.name)}
                                        </a>
                                    </li>
                                )}
                                <li>
                                    <a href={url.getLogoutUrl()}>{msg("doSignOut")}</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="container">
                <div className="bs-sidebar col-sm-3">
                    <ul>
                        <li className={clsx(active === "account" && "active")}>
                            <a href={url.accountUrl}>{msg("account")}</a>
                        </li>
                        {features.passwordUpdateSupported && (
                            <li className={clsx(active === "password" && "active")}>
                                <a href={url.passwordUrl}>{msg("password")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "totp" && "active")}>
                            <a href={url.totpUrl}>{msg("authenticator")}</a>
                        </li>
                        {features.identityFederation && (
                            <li className={clsx(active === "social" && "active")}>
                                <a href={url.socialUrl}>{msg("federatedIdentity")}</a>
                            </li>
                        )}
                        <li className={clsx(active === "sessions" && "active")}>
                            <a href={url.sessionsUrl}>{msg("sessions")}</a>
                        </li>
                        <li className={clsx(active === "applications" && "active")}>
                            <a href={url.applicationsUrl}>{msg("applications")}</a>
                        </li>
                        {features.log && (
                            <li className={clsx(active === "log" && "active")}>
                                <a href={url.logUrl}>{msg("log")}</a>
                            </li>
                        )}
                        {realm.userManagedAccessAllowed && features.authorization && (
                            <li className={clsx(active === "authorization" && "active")}>
                                <a href={url.resourceUrl}>{msg("myResources")}</a>
                            </li>
                        )}
                    </ul>
                </div>

                <div className="col-sm-9 content-area">
                    {message !== undefined && (
                        <div className={clsx("alert", `alert-${message.type}`)}>
                            {message.type === "success" && <span className="pficon pficon-ok"></span>}
                            {message.type === "error" && <span className="pficon pficon-error-circle-o"></span>}
                            <span className="kc-feedback-text">{message.summary}</span>
                        </div>
                    )}

                    {children}
                </div>
            </div>
        </>
    );
}
