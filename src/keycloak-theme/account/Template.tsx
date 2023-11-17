// Copy pasted from: https://github.com/InseeFrLab/keycloakify/blob/main/src/login/Template.tsx

import {usePrepareTemplate} from "keycloakify/lib/usePrepareTemplate";
import {type TemplateProps} from "keycloakify/account/TemplateProps";
import type {KcContext} from "./kcContext";
import type {I18n} from "./i18n";
import {assert} from "keycloakify/tools/assert";
import React from "react";
import {
    Alert,
    alpha,
    AppBar,
    Box,
    Container,
    CssBaseline,
    Divider,
    Drawer,
    FormControl,
    IconButton,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    MenuItem,
    Select,
    Toolbar,
    Typography,
    useTheme
} from "@mui/material";
import {
    AccountCircle,
    Api,
    Description,
    Devices,
    Logout,
    Menu,
    Password,
    ScreenLockPortrait,
    SwitchAccount,
    Undo
} from "@mui/icons-material";

export default function Template(props: TemplateProps<KcContext, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, active, children} = props;


    const {msg, changeLocale, labelBySupportedLanguageTag, currentLanguageTag} = i18n;

    const {locale, url, features, realm, message, referrer} = kcContext;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const theme = useTheme();

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };
    const {isReady} = usePrepareTemplate({
        bodyClassName: undefined,
        "doFetchDefaultThemeResources": doUseDefaultCss,
        "styles": [
            `${url.resourcesPath}/css/account.css`
        ],
        "htmlClassName": undefined
    });
    const drawerWidth = 240;


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
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Cedsoft Accounts
                </Typography>
            </Toolbar>
            <Divider/>
            <List>
                <ListItemButton key={"account"} selected={active === "account"} href={url.accountUrl}>
                    <ListItemIcon> <AccountCircle/>
                    </ListItemIcon>
                    <ListItemText primary={msg("account")}/>
                </ListItemButton>
                {features.passwordUpdateSupported && (
                    <ListItemButton key={"password"} selected={active === "password"} href={url.passwordUrl}>
                        <ListItemIcon>
                            <Password/>
                        </ListItemIcon>
                        <ListItemText primary={msg("password")}/>
                    </ListItemButton>
                )}
                <ListItemButton key={"totp"} selected={active === "totp"} href={url.totpUrl}>
                    <ListItemIcon>
                        <ScreenLockPortrait/>
                    </ListItemIcon>
                    <ListItemText primary={msg("authenticator")}/>
                </ListItemButton>
                {features.identityFederation && (
                    <ListItemButton key={"social"} selected={active === "social"} href={url.socialUrl}>
                        <ListItemIcon>
                            <SwitchAccount/>
                        </ListItemIcon>
                        <ListItemText primary={msg("federatedIdentity")}/>
                    </ListItemButton>
                )}
                <ListItemButton key={"social"} selected={active === "sessions"} href={url.sessionsUrl}>
                    <ListItemIcon>
                        <Devices/>
                    </ListItemIcon>
                    <ListItemText primary={msg("sessions")}/>
                </ListItemButton>
                <ListItemButton key={"applications"} selected={active === "applications"} href={url.applicationsUrl}>
                    <ListItemIcon>
                        <Api/>
                    </ListItemIcon>
                    <ListItemText primary={msg("applications")}/>
                </ListItemButton>
                {features.log && (
                    <ListItemButton key={"log"} selected={active === "log"} href={url.logUrl}>
                        <ListItemIcon>
                            <Description/>
                        </ListItemIcon>
                        <ListItemText primary={msg("log")}/>
                    </ListItemButton>
                )}
                {realm.userManagedAccessAllowed && features.authorization && (
                    <ListItemButton key={"authorization"} selected={active === "authorization"} href={url.resourceUrl}>
                        <ListItemIcon>
                            <Description/>
                        </ListItemIcon>
                        <ListItemText primary={msg("myResources")}/>
                    </ListItemButton>
                )}
            </List>
        </div>
    );


    //const container = window !== undefined ? () => (window as any)().document.body : undefined;

    //if (container) {
    //    console.log("container", container())
    //}

    return (
        <Box sx={{display: 'flex'}}>
            <CssBaseline/>
            <AppBar
                position="fixed"
                sx={{
                    width: {sm: `calc(100% - ${drawerWidth}px)`},
                    ml: {sm: `${drawerWidth}px`},
                }}
            >
                <Toolbar>
                    <Box sx={{flexGrow: 1}}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                            sx={{mr: 2, display: {sm: 'none'}}}
                        >
                            <Menu fontSize={"large"}/>
                        </IconButton>
                    </Box>

                    {realm.internationalizationEnabled && (assert(locale !== undefined), true) && locale.supported.length > 1 && (

                        <FormControl sx={{m: 1, minWidth: 120}} size="small">
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={currentLanguageTag}
                                sx={{
                                    position: 'relative',
                                    backgroundColor: alpha(theme.palette.primary.contrastText, 0.15),
                                    '&:hover': {
                                        backgroundColor: alpha(theme.palette.primary.contrastText, 0.25),
                                    },
                                    marginLeft: 0,
                                    width: '100%',
                                }}
                                onChange={(selectedLanguageTag) => changeLocale(selectedLanguageTag.target.value)}
                            >
                                {locale.supported.map(({languageTag}) => (
                                    <MenuItem value={languageTag} key={languageTag}>
                                        {labelBySupportedLanguageTag[languageTag]}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                    {referrer?.url && (
                        <IconButton href={referrer.url} size={"large"} color={"inherit"}>
                            <Undo fontSize={"large"}/>
                            <Typography>
                                {msg("backTo", referrer.name)}

                            </Typography>
                        </IconButton>
                    )}
                    <IconButton href={url.getLogoutUrl()} size={"large"} color={"inherit"}>
                        <Logout/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Box
                component="nav"
                sx={{width: {sm: drawerWidth}, flexShrink: {sm: 0}}}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    //container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: {xs: 'block', sm: 'none'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                >
                    {drawer}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{
                        display: {xs: 'none', sm: 'block'},
                        '& .MuiDrawer-paper': {boxSizing: 'border-box', width: drawerWidth},
                    }}
                    open
                >
                    {drawer}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{flexGrow: 1, p: 3, width: {sm: `calc(100% - ${drawerWidth}px)`}}}
            >
                <Toolbar/>
                <Container>
                    {message !== undefined && (
                        <Alert severity={message.type}>{message.summary}</Alert>
                    )}
                    {children}
                </Container>
            </Box>
        </Box>
    )

}
