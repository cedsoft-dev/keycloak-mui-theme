import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createPageStory } from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "login-update-profile.ftl"
});

export default {
    title: "login/LoginUpdateProfile",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
