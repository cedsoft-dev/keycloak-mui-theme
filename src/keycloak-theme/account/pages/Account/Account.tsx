import {clsx} from "keycloakify/tools/clsx";
import type {PageProps} from "keycloakify/account/pages/PageProps";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack, TextField} from "@mui/material";

export default function Account(props: PageProps<Extract<KcContext, { pageId: "account.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {url, realm, messagesPerField, stateChecker, account, referrer} = kcContext;

    const {msg} = i18n;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} active="account">
            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("editAccountHtmlTitle")}</h2>
                </div>
                <div className="col-md-2 subtitle">
                    <span className="subtitle">
                        <span className="required">*</span> {msg("requiredFields")}
                    </span>
                </div>
            </div>

            <form action={url.accountUrl} className="form-horizontal" method="post">
                <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker}/>
                <Stack spacing={2}>
                    {!realm.registrationEmailAsUsername && (
                        <div className={clsx("form-group", messagesPerField.printIfExists("username", "has-error"))}>
                            <div className="col-sm-10 col-md-10">
                                <TextField
                                    fullWidth
                                    label={msg("username")}
                                    type={"text"}
                                    id={"username"}
                                    name={"username"}
                                    disabled={!realm.editUsernameAllowed}
                                    value={account.username ?? ""}
                                    required={realm.editUsernameAllowed}
                                />
                            </div>
                        </div>
                    )}

                    <div className={clsx("form-group", messagesPerField.printIfExists("email", "has-error"))}>

                        <div className="col-sm-10 col-md-10">
                            <TextField
                                fullWidth
                                label={msg("email")}
                                type={"text"}
                                id={"email"}
                                name={"email"}
                                autoFocus
                                value={account.email ?? ""}
                                required
                            />
                        </div>
                    </div>

                    <div className={clsx("form-group", messagesPerField.printIfExists("firstName", "has-error"))}>

                        <div className="col-sm-10 col-md-10">
                            <TextField
                                fullWidth
                                label={msg("firstName")}
                                type={"text"}
                                id={"firstName"}
                                name={"firstName"}
                                value={account.firstName ?? ""}
                                required
                            />
                        </div>
                    </div>

                    <div className={clsx("form-group", messagesPerField.printIfExists("lastName", "has-error"))}>
                        <div className="col-sm-10 col-md-10">
                            <TextField
                                fullWidth
                                label={msg("lastName")}
                                type={"text"}
                                id={"lastName"}
                                name={"lastName"}
                                value={account.lastName ?? ""}
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                            <div>
                                {referrer !== undefined && <a href={referrer?.url}>{msg("backToApplication")}</a>}

                                <Button sx={{mr: 1}} type={"submit"} name={"submitAction"}
                                        value={"Cancel"}>{msg("doCancel")}</Button>
                                <Button sx={{ml: 1}} variant={"contained"} type={"submit"} name={"submitAction"}
                                        value={"Save"}
                                        color={"secondary"}>{msg("doSave")}</Button>

                            </div>
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
