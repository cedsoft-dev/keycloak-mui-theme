import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "info.ftl"
});

export default {
    title: "login/Info",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const RequiredActions: ComponentStory<typeof PageStory> = () => (
    <PageStory
        kcContext={{
            requiredActions: ["CONFIGURE_TOTP", "terms_and_conditions", "UPDATE_PASSWORD", "UPDATE_PROFILE", "VERIFY_EMAIL", "CONFIGURE_RECOVERY_AUTHN_CODES", "webauthn-register-passwordless"]
        }}
    />
);
export const ProceedWithAction: ComponentStory<typeof PageStory> = () => (
    <PageStory
        kcContext={{
            actionUri: "#"
        }}
    />
);

export const BackToApp: ComponentStory<typeof PageStory> = () => (
    <PageStory
        kcContext={{
            actionUri: undefined,
            client: {
                baseUrl: "#"
            }
        }}
    />
);
export const BackToAppWithNoSkipLinkAndWithoutRedirectUri: ComponentStory<typeof PageStory> = () => (
    <PageStory
        kcContext={{
            pageRedirectUri: "#",
            skipLink: false
        }}
    />
);
