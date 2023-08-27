import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createPageStory } from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "register.ftl"
});

export default {
    title: "login/Register",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
