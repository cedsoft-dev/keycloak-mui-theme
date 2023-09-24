import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "error.ftl"
});

export default {
    title: "login/Error",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
