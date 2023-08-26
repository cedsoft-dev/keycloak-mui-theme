import {assert} from "keycloakify/lib/tools/assert";

import {Button, List, ListItem, ListItemText, Stack, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";
import {useTranslation} from "react-i18next";


function Info(props) {
    const {kcContext} = props;
    const {t} = useTranslation();


    assert(kcContext.message !== undefined);

    const {messageHeader, message, requiredActions, skipLink, pageRedirectUri, actionUri, client} = kcContext;


    function renderActionList() {
        if (requiredActions !== undefined) {
            const actions = requiredActions.map(requiredAction => t(`requiredAction.${requiredAction}`))
            return (
                <List dense>
                    {actions.map(action => {
                            return (
                                <ListItem>
                                    <ListItemText
                                        primary={action}
                                    />
                                </ListItem>
                            )
                        }
                    )}
                </List>
            )
        }
    }

    function renderActionButtons() {
        const content = {
            url: null,
            message: null
        }

        if (!skipLink && pageRedirectUri) {
            content.url = pageRedirectUri;
            content.message = t("backToApplication");
        }

        if (actionUri && !pageRedirectUri) {
            content.url = actionUri;
            content.message = t("proceedWithAction");
        }

        if (client.baseUrl && !actionUri && !pageRedirectUri) {
            content.url = client.baseUrl;
            content.message = t("backToApplication");
        }

        return (
            <Button color={"secondary"} variant={"contained"} fullWidth href={content.url}>
                {content.message}
            </Button>
        )
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            headerNode={messageHeader !== undefined ? messageHeader : message.summary}
        >
            <Stack spacing={2}>
                <Typography variant={"h6"}>{message.summary}</Typography>
                {renderActionList()}
                {renderActionButtons()}
            </Stack>
        </Wrapper>
    );
}

export default Info;
