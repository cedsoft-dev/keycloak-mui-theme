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
const Msg_1 = require("./Msg");
const KeycloakContext_1 = require("../keycloak-service/KeycloakContext");
const react_core_1 = require("@patternfly/react-core");

function handleLogout(keycloak) {
    keycloak.logout();
}

class LogoutButton extends React.Component {
    render() {
        return (<KeycloakContext_1.KeycloakContext.Consumer>
            {keycloak => (<react_core_1.Button id="signOutButton" onClick={() => handleLogout(keycloak)}><Msg_1.Msg
                msgKey="doSignOut"/></react_core_1.Button>)}
        </KeycloakContext_1.KeycloakContext.Consumer>);
    }
}

exports.LogoutButton = LogoutButton;

class LogoutDropdownItem extends React.Component {
    render() {
        return (<KeycloakContext_1.KeycloakContext.Consumer>
            {keycloak => (
                <react_core_1.DropdownItem id="signOutLink" key="logout" onClick={() => handleLogout(keycloak)}>
                    {Msg_1.Msg.localize('doSignOut')}
                </react_core_1.DropdownItem>)}
        </KeycloakContext_1.KeycloakContext.Consumer>);
    }
}

exports.LogoutDropdownItem = LogoutDropdownItem;
//# sourceMappingURL=Logout.jsx.map