import {useTranslation} from 'react-i18next';
import {Button, Link, Stack, Typography} from "@mui/material";
import Wrapper from "../../components/wrapper/Wrapper";

function Error(props) {
    const {kcContext} = props;
    const {t} = useTranslation();


    const {message, client} = kcContext;

    function renderBackToApp() {
        if (client && client.baseUrl) {
            return (
                <>

                    <Button fullWidth color={"secondary"} variant={"contained"} component={Link} href={client.baseUrl}>
                        {t("backToApplication")}
                    </Button>
                </>
            )
        }
    }

    return (
        <Wrapper
            {...{kcContext, ...props}}
            doFetchDefaultThemeResources={true}
            displayMessage={false}
            headerNode={t("errorTitle")}
        >
            <Stack spacing={2}>
                <Typography variant={"h6"}>{message.summary}</Typography>

                {renderBackToApp()}
            </Stack>
        </Wrapper>
    );
}

export default Error;
