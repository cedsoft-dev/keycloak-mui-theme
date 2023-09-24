import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "select-authenticator.ftl"
});

export default {
    title: "login/SelectAuthenticator",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
