import {ComponentMeta, ComponentStory} from '@storybook/react';
import {createPageStory} from "../../createPageStory";

const {PageStory} = createPageStory({
    pageId: "register.ftl"
});

export default {
    title: "login/Register",
    component: PageStory,
} as ComponentMeta<typeof PageStory>;

export const Primary: ComponentStory<typeof PageStory> = () => <PageStory/>;

export const Captcha: ComponentStory<typeof PageStory> = () => <PageStory
    kcContext={{
        recaptchaRequired: true,
        recaptchaSiteKey: "6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
    }}
/>;
