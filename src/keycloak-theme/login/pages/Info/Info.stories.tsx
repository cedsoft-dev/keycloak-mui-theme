import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createPageStory } from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "info.ftl"
});

export default {
    title: "login/Info",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
