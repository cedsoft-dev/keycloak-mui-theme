import type {PageProps} from "keycloakify/account/pages/PageProps";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {Button, Stack, TextField} from "@mui/material";

export default function LogoutConfirm(props: PageProps<Extract<KcContext, { pageId: "password.ftl" }>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;

    const {url, password, account, stateChecker} = kcContext;

    const {msg} = i18n;

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} active="password">
            <div className="row">
                <div className="col-md-10">
                    <h2>{msg("changePasswordHtmlTitle")}</h2>
                </div>
                <div className="col-md-2 subtitle">
                    <span className="subtitle">{msg("allFieldsRequired")}</span>
                </div>
            </div>

            <form action={url.passwordUrl} className="form-horizontal" method="post">
                <Stack spacing={2}>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={account.username ?? ""}
                        autoComplete="username"
                        readOnly
                        style={{"display": "none"}}
                    />

                    {password.passwordSet && (
                        <div className="form-group">
                            <div className="col-sm-10 col-md-10">
                                <TextField fullWidth label={msg("password")} type={"password"} id={"password"}
                                           name={"password"} autoFocus autoComplete={"current-password"}/>
                            </div>
                        </div>
                    )}

                    <input type="hidden" id="stateChecker" name="stateChecker" value={stateChecker}/>

                    <div className="form-group">
                        <div className="col-sm-10 col-md-10">
                            <TextField fullWidth label={msg("passwordNew")} type={"password"} id={"password-new"}
                                       name={"password-new"} autoComplete={"new-password"}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-10 col-md-10">
                            <TextField fullWidth label={msg("passwordConfirm")} type={"password"}
                                       id={"password-confirm"} name={"password-confirm"} autoComplete={"new-password"}/>
                        </div>
                    </div>

                    <div className="form-group">
                        <div id="kc-form-buttons" className="col-md-offset-2 col-md-10 submit">
                            <Button type={"submit"} color={"secondary"} variant={"contained"} name={"submitAction"}
                                    value={"Save"}>{msg("doSave")}</Button>
                        </div>
                    </div>
                </Stack>
            </form>
        </Template>
    );
}
