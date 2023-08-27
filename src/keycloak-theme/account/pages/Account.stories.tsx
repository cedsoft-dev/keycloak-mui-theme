
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { createPageStory } from "../createPageStory";

const { PageStory } = createPageStory({
    pageId: "account.ftl"
});

export default {
    title: "account/Account",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Default: ComponentStory<typeof PageStory> = () => <PageStory
    kcContext={{
        message: { type: "success", summary: "This is a test message" }
    }}
/>;
