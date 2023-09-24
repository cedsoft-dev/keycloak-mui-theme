import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const { PageStory } = createPageStory({
    pageId: "update-email.ftl"
});

export default {
    title: "login/UpdateEmail",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory />;

export const WithIsAppInitiatedAction: ComponentStory<typeof PageStory> = () => (
    <PageStory
        kcContext={{
            isAppInitiatedAction: true
        }}
    />
);
