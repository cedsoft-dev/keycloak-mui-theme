import { ComponentStory, ComponentMeta } from '@storybook/react';
import { createPageStory } from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "idp-review-user-profile.ftl"
});

export default {
    title: "login/IdpReviewUserProfile",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;
