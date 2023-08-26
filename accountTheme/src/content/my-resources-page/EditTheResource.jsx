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
const react_core_1 = require("@patternfly/react-core");
const react_icons_1 = require("@patternfly/react-icons");
const resource_model_1 = require("./resource-model");
const Msg_1 = require("../../widgets/Msg");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const ContentAlert_1 = require("../ContentAlert");
const PermissionSelect_1 = require("./PermissionSelect");

class EditTheResource extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleToggleDialog = () => {
            if (this.state.isOpen) {
                this.setState({isOpen: false});
                this.props.onClose();
            } else {
                this.clearState();
                this.setState({isOpen: true});
            }
        };
        this.updateChanged = (row) => {
            const changed = this.state.changed;
            changed[row] = !changed[row];
            this.setState({changed});
        };
        this.context = context;
        this.state = {
            changed: [],
            isOpen: false,
        };
    }

    clearState() {
        this.setState({});
    }

    async savePermission(permission) {
        await this.context.doPut(`/resources/${this.props.resource._id}/permissions`, [permission]);
        ContentAlert_1.ContentAlert.success(Msg_1.Msg.localize('updateSuccess'));
    }

    render() {
        return (<React.Fragment>
            {this.props.children(this.handleToggleDialog)}

            <react_core_1.Modal title={'Edit the resource - ' + this.props.resource.name} isLarge
                                isOpen={this.state.isOpen} onClose={this.handleToggleDialog} actions={[
                <react_core_1.Button key="done" variant="link" id="done" onClick={this.handleToggleDialog}>
                    <Msg_1.Msg msgKey='done'/>
                </react_core_1.Button>,
            ]}>
                <react_core_1.Form isHorizontal>
                    {this.props.permissions.map((p, row) => (<React.Fragment>
                        <react_core_1.FormGroup fieldId={`username-${row}`} label={Msg_1.Msg.localize('User')}>
                            <react_core_1.TextInput id={`username-${row}`} type="text" value={p.username} isDisabled/>

                        </react_core_1.FormGroup>
                        <react_core_1.FormGroup fieldId={`permissions-${row}`} label={Msg_1.Msg.localize('permissions')}
                                                isRequired>
                            <react_core_1.InputGroup>
                                <PermissionSelect_1.PermissionSelect scopes={this.props.resource.scopes}
                                                                     selected={p.scopes.map(s => new resource_model_1.Scope(s))}
                                                                     direction={row === this.props.permissions.length - 1 ? "up" : "down"}
                                                                     onSelect={selection => {
                                                                         p.scopes = selection.map(s => s.name);
                                                                         this.updateChanged(row);
                                                                     }}/>
                                <react_core_1.Button id={`save-${row}`} isDisabled={!this.state.changed[row]}
                                                     onClick={() => this.savePermission(p)}>
                                    <react_icons_1.OkIcon/>
                                </react_core_1.Button>
                            </react_core_1.InputGroup>
                        </react_core_1.FormGroup>
                        <hr/>
                    </React.Fragment>))}
                </react_core_1.Form>
            </react_core_1.Modal>
        </React.Fragment>);
    }
}

exports.EditTheResource = EditTheResource;
EditTheResource.defaultProps = {permissions: []};
EditTheResource.contextType = AccountServiceContext_1.AccountServiceContext;
//# sourceMappingURL=EditTheResource.jsx.map