import {getKcContext} from "keycloakify";


const kcContext = getKcContext({
    /* Uncomment to test */
    //"mockPageId": "login.ftl",
    /**
     * Customize the simulated kcContext that will let us
     * dev the page outside keycloak (with auto-reload)
     */
    "mockData": [
        {
            "pageId": "my-extra-page-2.ftl",
            "someCustomValue": "foo bar baz"
        },
        {
            "pageId": "register.ftl",
            "authorizedMailDomains": [
                "example.com",
                "another-example.com",
                "*.yet-another-example.com",
                "*.example.com",
                "hello-world.com"
            ]
        },
        {
            "pageId": "login.ftl",
            "social": {
                "providers": [
                    {
                        "alias": "google",
                        "displayName": "Google",
                        "iconClasses": "fa fa-google",
                        "loginUrl": "/auth/realms/myrealm/broker/google/login?client_id=myclient&tab_id=i8VxoMbyRM8&session_code=J9F7HNflpPQjUMckxtDAIh75sutCFQwA9zoobtrJKQY",
                        "providerId": "google",
                    },
                    {
                        "alias": "apple",
                        "displayName": "Apple",
                        "iconClasses": "fa fa-apple",
                        "loginUrl": "/auth/realms/myrealm/broker/google/login?client_id=myclient&tab_id=i8VxoMbyRM8&session_code=J9F7HNflpPQjUMckxtDAIh75sutCFQwA9zoobtrJKQY",
                        "providerId": "apple",
                    },
                    {
                        "alias": "facebook",
                        "displayName": "Facebook",
                        "iconClasses": "fa fa-facebook",
                        "loginUrl": "/auth/realms/myrealm/broker/google/login?client_id=myclient&tab_id=i8VxoMbyRM8&session_code=J9F7HNflpPQjUMckxtDAIh75sutCFQwA9zoobtrJKQY",
                        "providerId": "facebook",
                    },
                    {
                        "alias": "instagram",
                        "displayName": "Instagram",
                        "iconClasses": "fa fa-instagram",
                        "loginUrl": "/auth/realms/myrealm/broker/google/login?client_id=myclient&tab_id=i8VxoMbyRM8&session_code=J9F7HNflpPQjUMckxtDAIh75sutCFQwA9zoobtrJKQY",
                        "providerId": "instagram",
                    }
                ]
            }
        }
    ]
});

export default kcContext;
