import type {PageProps} from "keycloakify/login/pages/PageProps";
import {useGetClassName} from "keycloakify/login/lib/useGetClassName";
import type {KcContext} from "../../kcContext";
import type {I18n} from "../../i18n";
import {MouseEvent, useRef} from "react";
import {useConstCallback} from "keycloakify/tools/useConstCallback";
import {List, ListItemButton, ListItemText} from "@mui/material";

export default function SelectAuthenticator(props: PageProps<Extract<KcContext, {
    pageId: "select-authenticator.ftl"
}>, I18n>) {
    const {kcContext, i18n, doUseDefaultCss, Template, classes} = props;
    const {url, auth} = kcContext;

    const {getClassName} = useGetClassName({doUseDefaultCss, classes});
    const {msg} = i18n;

    const selectCredentialsForm = useRef<HTMLFormElement>(null);
    const authExecIdInput = useRef<HTMLInputElement>(null);

    const submitForm = useConstCallback(() => {
        selectCredentialsForm.current?.submit();
    });

    const onSelectedAuthenticator = useConstCallback((event: MouseEvent<HTMLDivElement>) => {
        const divElement = event.currentTarget;
        const authExecId = divElement.dataset.authExecId;

        if (!authExecIdInput.current || !authExecId) {
            return;
        }

        authExecIdInput.current.value = authExecId;
        submitForm();
    });

    return (
        <Template {...{kcContext, i18n, doUseDefaultCss, classes}} headerNode={msg("loginChooseAuthenticator")}>
            <form
                id="kc-select-credential-form"
                className={getClassName("kcFormClass")}
                ref={selectCredentialsForm}
                action={url.loginAction}
                method="post"
            >
                <div className={getClassName("kcSelectAuthListClass")}>
                    <List>
                        {auth.authenticationSelections.map((authenticationSelection, index) =>
                            <ListItemButton
                                onClick={onSelectedAuthenticator}
                                data-auth-exec-id={authenticationSelection.authExecId}
                            >
                                <ListItemText
                                    primary={msg(authenticationSelection.displayName)}
                                    secondary={msg(authenticationSelection.helpText)}
                                />
                            </ListItemButton>)
                        }
                    </List>
                    <input type="hidden" id="authexec-hidden-input" name="authenticationExecution"
                           ref={authExecIdInput}/>
                </div>
            </form>
        </Template>
    );
}
