"use strict";
/*
 * Copyright 2019 Red Hat, Inc. and/or its affiliates.
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
const react_router_dom_1 = require("react-router-dom");
const AIACommand_1 = require("../../util/AIACommand");
const Msg_1 = require("../../widgets/Msg");
const react_core_1 = require("@patternfly/react-core");
const react_icons_1 = require("@patternfly/react-icons");
const KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");

/**
 * @author Stan Silvert
 */
class ApplicationInitiatedActionPage extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = (keycloak) => {
            new AIACommand_1.AIACommand(keycloak, this.props.pageDef.kcAction).execute();
        };
    }

    render() {
        return (<react_core_1.EmptyState variant={react_core_1.EmptyStateVariant.full}>
            <react_core_1.EmptyStateIcon icon={react_icons_1.PassportIcon}/>
            <react_core_1.Title headingLevel={react_core_1.TitleLevel.h5} size="lg">
                <Msg_1.Msg msgKey={this.props.pageDef.label} params={this.props.pageDef.labelParams}/>
            </react_core_1.Title>
            <react_core_1.EmptyStateBody>
                <Msg_1.Msg msgKey="actionRequiresIDP"/>
            </react_core_1.EmptyStateBody>
            <KeycloakContext_1.KeycloakContext.Consumer>
                {keycloak => (
                    <react_core_1.Button variant="primary" onClick={() => this.handleClick(keycloak)} target="_blank">
                        <Msg_1.Msg msgKey="continue"/></react_core_1.Button>)}
            </KeycloakContext_1.KeycloakContext.Consumer>

        </react_core_1.EmptyState>);
    }
}
;
// Note that the class name is not exported above.  To get access to the router,
// we use withRouter() and export a different name.
exports.AppInitiatedActionPage = react_router_dom_1.withRouter(ApplicationInitiatedActionPage);
//# sourceMappingURL=AppInitiatedActionPage.jsx.map