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
const PageNav_1 = require("./PageNav");
const PageToolbar_1 = require("./PageToolbar");
const ContentPages_1 = require("./ContentPages");
const react_core_1 = require("@patternfly/react-core");
const KeycloakContext_1 = require("./keycloak-service/KeycloakContext");
;

class App extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        toggleReact();
    }

    render() {
        toggleReact();
        // check login
        if (!this.context.authenticated() && !isWelcomePage()) {
            this.context.login();
        }
        const username = (<span style={{marginLeft: '10px'}} id="loggedInUser">{loggedInUserName()}</span>);
        const Header = (<react_core_1.PageHeader logo={<a id="brandLink" href={brandUrl}>
            <react_core_1.Brand src={brandImg} alt="Logo" className="brand"/>
        </a>} toolbar={<PageToolbar_1.PageToolbar/>} avatar={username} showNavToggle/>);
        const Sidebar = <react_core_1.PageSidebar nav={<PageNav_1.PageNav/>}/>;
        return (<span style={{height: '100%'}}>
                <react_core_1.Page header={Header} sidebar={Sidebar} isManagedSidebar>
                    <react_core_1.PageSection>
                        {ContentPages_1.makeRoutes()}
                    </react_core_1.PageSection>
                </react_core_1.Page>
            </span>);
    }
}

exports.App = App;
App.contextType = KeycloakContext_1.KeycloakContext;
;
//# sourceMappingURL=App.jsx.map