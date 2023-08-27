import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createPageStory } from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "login-config-totp.ftl"
});

export default {
    title: "login/LoginConfigTotp",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
