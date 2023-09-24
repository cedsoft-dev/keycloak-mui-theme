import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "saml-post-form.ftl"
});

export default {
    title: "login/SamlPostForm",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
