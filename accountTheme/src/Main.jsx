"use strict";
/*
 * Copyright 2018 Red Hat, Inc. and/or its affiliates.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
Object.defineProperty(exports, "__esModule", {value: true});
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const App_1 = require("./App");
const ContentPages_1 = require("./ContentPages");
const keycloak_service_1 = require("./keycloak-service/keycloak.service");
const KeycloakContext_1 = require("./keycloak-service/KeycloakContext");
const account_service_1 = require("./account-service/account.service");
const AccountServiceContext_1 = require("./account-service/AccountServiceContext");

class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        isReactLoading = false;
        toggleReact();
    }

    render() {
        const keycloakService = new keycloak_service_1.KeycloakService(keycloak);
        return (<react_router_dom_1.HashRouter>
            <KeycloakContext_1.KeycloakContext.Provider value={keycloakService}>
                <AccountServiceContext_1.AccountServiceContext.Provider
                    value={new account_service_1.AccountServiceClient(keycloakService)}>
                    <App_1.App/>
                </AccountServiceContext_1.AccountServiceContext.Provider>
            </KeycloakContext_1.KeycloakContext.Provider>
        </react_router_dom_1.HashRouter>);
    }
}

exports.Main = Main;
;
const e = React.createElement;

function removeHidden(items) {
    const visible = [];
    for (let item of items) {
        if (item.hidden && eval(item.hidden))
            continue;
        if (ContentPages_1.isExpansion(item)) {
            visible.push(item);
            item.content = removeHidden(item.content);
            if (item.content.length === 0) {
                visible.pop(); // remove empty expansion
            }
        } else {
            visible.push(item);
        }
    }
    return visible;
}

content = removeHidden(content);
ContentPages_1.initGroupAndItemIds();

function loadModule(modulePage) {
    return new Promise((resolve, reject) => {
        console.log('loading: ' + resourceUrl + modulePage.modulePath);
        Promise.resolve().then(() => require(resourceUrl + modulePage.modulePath)).then((module) => {
            modulePage.module = module;
            resolve(modulePage);
        }).catch((error) => {
            console.warn('Unable to load ' + modulePage.label + ' because ' + error.message);
            reject(modulePage);
        });
    });
}
;
const moduleLoaders = [];
ContentPages_1.flattenContent(content).forEach((item) => {
    if (ContentPages_1.isModulePageDef(item)) {
        moduleLoaders.push(loadModule(item));
    }
});
// load content modules and start
Promise.all(moduleLoaders).then(() => {
    const domContainer = document.querySelector('#main_react_container');
    ReactDOM.render(e(Main), domContainer);
});
//# sourceMappingURL=Main.jsx.map