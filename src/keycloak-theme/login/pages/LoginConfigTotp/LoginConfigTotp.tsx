import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {MessageKey} from "keycloakify/login/i18n/i18n";
import {Button, Link, Stack, TextField, Typography} from "@mui/material";
import LoadingClickButton from "../../../components/LoadingClickButton/LoadingClickButton";

export default function LoginConfigTotp(props: PageProps<Extract<KcContext, {
    pageId: "login-config-totp.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {getClassName} = useGetClassName({
        doUseDefaultCss,
        classes
    });

    const {url, isAppInitiatedAction, totp, mode, messagesPerField} = kcContext;

    const {msg, msgStr} = i18n;

    const algToKeyUriAlg: Record<(typeof kcContext)["totp"]["policy"]["algorithm"], string> = {
        "HmacSHA1": "SHA1",
        "HmacSHA256": "SHA256",
        "HmacSHA512": "SHA512"
    };

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginTotpTitle")}>
            <>
                <Stack spacing={2}>
                    <ol id="kc-totp-settings">
                        <li>
                            <Typography variant={"body1"}>{msg("loginTotpStep1")}</Typography>

                            <ul id="kc-totp-supported-apps">
                                {totp.supportedApplications.map(app => (
                                    <li>{msgStr(app as MessageKey, app)}</li>
                                ))}
                            </ul>
                        </li>

                        {mode && mode === "manual" ? (
                            <>
                                <li>
                                    <Typography variant={"body1"}>{msg("loginTotpManualStep2")}</Typography>
                                    <Typography variant={"body1"}>
                                        <span id="kc-totp-secret-key">{totp.totpSecretEncoded}</span>
                                    </Typography>
                                    <Typography variant={"body1"}>
                                        <Link href={totp.qrUrl} id="mode-barcode">
                                            {msg("loginTotpScanBarcode")}
                                        </Link>
                                    </Typography>
                                </li>
                                <li>
                                    <Typography variant={"body1"}>{msg("loginTotpManualStep3")}</Typography>
                                    <Typography variant={"body1"}>
                                        <ul>
                                            <li id="kc-totp-type">
                                                {msg("loginTotpType")}: {msg(`loginTotp.${totp.policy.type}`)}
                                            </li>
                                            <li id="kc-totp-algorithm">
                                                {msg("loginTotpAlgorithm")}: {algToKeyUriAlg?.[totp.policy.algorithm] ?? totp.policy.algorithm}
                                            </li>
                                            <li id="kc-totp-digits">
                                                {msg("loginTotpDigits")}: {totp.policy.digits}
                                            </li>
                                            {totp.policy.type === "totp" ? (
                                                <li id="kc-totp-period">
                                                    {msg("loginTotpInterval")}: {totp.policy.period}
                                                </li>
                                            ) : (
                                                <li id="kc-totp-counter">
                                                    {msg("loginTotpCounter")}: {totp.policy.initialCounter}
                                                </li>
                                            )}
                                        </ul>
                                    </Typography>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Typography variant={"body1"}>{msg("loginTotpStep2")}</Typography>
                                <img id="kc-totp-secret-qr-code" src={`data:image/png;base64, ${totp.totpSecretQrCode}`}
                                     alt="Figure: Barcode" style={{width: "100%", maxWidth: "20rem", height: "auto"}}/>
                                <br/>
                                <Typography variant={"body1"}>
                                    <Link href={totp.manualUrl} id="mode-manual">
                                        {msg("loginTotpUnableToScan")}
                                    </Link>
                                </Typography>
                            </li>
                        )}
                        <li>
                            <Typography variant={"body1"}>{msg("loginTotpStep3")}</Typography>
                            <Typography variant={"body1"}>{msg("loginTotpStep3DeviceName")}</Typography>
                        </li>
                    </ol>
                </Stack>
                <form action={url.loginAction} className={getClassName("kcFormClass")} id="kc-totp-settings-form"
                      method="post">
                    <Stack spacing={2}>
                        <div className={getClassName("kcFormGroupClass")}>
                            <div className={getClassName("kcInputWrapperClass")}>
                                <TextField
                                    type="text"
                                    id="totp"
                                    name="totp"
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError("totp")}
                                    required
                                    label={msg("authenticatorCode")}
                                    fullWidth
                                />

                                {messagesPerField.existsError("totp") && (
                                    <span id="input-error-otp-code" className={getClassName("kcInputErrorMessageClass")}
                                          aria-live="polite">
                                    {messagesPerField.get("totp")}
                                </span>
                                )}
                            </div>
                            <input type="hidden" id="totpSecret" name="totpSecret" value={totp.totpSecret}/>
                            {mode && <input type="hidden" id="mode" value={mode}/>}
                        </div>

                        <div className={getClassName("kcFormGroupClass")}>
                            <div className={getClassName("kcInputWrapperClass")}>
                                <TextField
                                    fullWidth
                                    type="text"
                                    id="userLabel"
                                    name="userLabel"
                                    autoComplete="off"
                                    aria-invalid={messagesPerField.existsError("userLabel")}
                                    label={msg("loginTotpDeviceName")}
                                    required={totp.otpCredentials.length >= 1}
                                />
                                {messagesPerField.existsError("userLabel") && (
                                    <span id="input-error-otp-label"
                                          className={getClassName("kcInputErrorMessageClass")}
                                          aria-live="polite">
                                    {messagesPerField.get("userLabel")}
                                </span>
                                )}
                            </div>
                        </div>

                        {isAppInitiatedAction ? (
                            <>
                                <LoadingClickButton color={"secondary"} variant={"contained"}
                                        id="saveTOTPBtn"
                                        value={msgStr("doSubmit")} type={"submit"}>{msgStr("doSubmit")}</LoadingClickButton>
                                <Button
                                    type={"submit"}
                                    id="cancelTOTPBtn"
                                    name="cancel-aia"
                                    value="true">{msgStr("doCancel")}</Button>
                            </>
                        ) : (
                            <LoadingClickButton
                                type="submit"
                                id="saveTOTPBtn"
                                value={msgStr("doSubmit")}
                                variant={"contained"}
                                color={"secondary"}
                                fullWidth
                            >
                                {msgStr("doSubmit")}
                            </LoadingClickButton>
                        )}
                    </Stack>
                </form>
            </>
        </Template>
    );
}
