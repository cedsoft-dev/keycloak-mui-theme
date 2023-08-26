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
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const Msg_1 = require("../../widgets/Msg");
const ContentAlert_1 = require("../ContentAlert");
const PermissionSelect_1 = require("./PermissionSelect");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
class ShareTheResource extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleAddPermission = () => {
            const rscId = this.props.resource._id;
            const newPermissions = [];
            for (const permission of this.state.permissionsSelected) {
                newPermissions.push(permission.name);
            }
            const permissions = [];
            for (const username of this.state.usernames) {
                permissions.push({username: username, scopes: newPermissions});
            }
            this.handleToggleDialog();
            this.context.doPut(`/resources/${rscId}/permissions`, permissions)
                .then(() => {
                    ContentAlert_1.ContentAlert.success('shareSuccess');
                    this.props.onClose();
                });
        };
        this.handleToggleDialog = () => {
            if (this.state.isOpen) {
                this.setState({isOpen: false});
                this.props.onClose();
            } else {
                this.clearState();
                this.setState({isOpen: true});
            }
        };
        this.handleUsernameChange = (username) => {
            this.setState({usernameInput: username});
        };
        this.handleAddUsername = async () => {
            if ((this.state.usernameInput !== '') && (!this.state.usernames.includes(this.state.usernameInput))) {
                const response = await this.context.doGet(`/resources/${this.props.resource._id}/user`, {params: {value: this.state.usernameInput}});
                if (response.data && response.data.username) {
                    this.setState({usernameInput: '', usernames: [...this.state.usernames, this.state.usernameInput]});
                } else {
                    ContentAlert_1.ContentAlert.info('userNotFound', [this.state.usernameInput]);
                }
            }
        };
        this.handleEnterKeyInAddField = (event) => {
            if (event.key === "Enter") {
                event.preventDefault();
                this.handleAddUsername();
            }
        };
        this.handleDeleteUsername = (username) => {
            const newUsernames = this.state.usernames.filter(user => user !== username);
            this.setState({usernames: newUsernames});
        };
        this.context = context;
        this.state = {
            isOpen: false,
            permissionsSelected: [],
            permissionsUnSelected: this.props.resource.scopes,
            usernames: [],
            usernameInput: ''
        };
    }

    clearState() {
        this.setState({
            permissionsSelected: [],
            permissionsUnSelected: this.props.resource.scopes,
            usernames: [],
            usernameInput: ''
        });
    }

    isAddDisabled() {
        return this.state.usernameInput === '' || this.isAlreadyShared();
    }

    isAlreadyShared() {
        for (let permission of this.props.permissions) {
            if (permission.username === this.state.usernameInput)
                return true;
        }
        return false;
    }

    isFormInvalid() {
        return (this.state.usernames.length === 0) || (this.state.permissionsSelected.length === 0);
    }

    render() {
        return (<React.Fragment>
            {this.props.children(this.handleToggleDialog)}

            <react_core_1.Modal title={'Share the resource - ' + this.props.resource.name} isLarge={true}
                                isOpen={this.state.isOpen} onClose={this.handleToggleDialog} actions={[
                <react_core_1.Button key="cancel" variant="link" onClick={this.handleToggleDialog}>
                    <Msg_1.Msg msgKey='cancel'/>
                </react_core_1.Button>,
                <react_core_1.Button key="confirm" variant="primary" id="done" onClick={this.handleAddPermission}
                                     isDisabled={this.isFormInvalid()}>
                    <Msg_1.Msg msgKey='done'/>
                </react_core_1.Button>
            ]}>
                <react_core_1.Stack gutter='md'>
                    <react_core_1.StackItem isFilled>
                        <react_core_1.Form>
                            <react_core_1.FormGroup label="Add users to share your resource with" type="string"
                                                    helperTextInvalid={Msg_1.Msg.localize('resourceAlreadyShared')}
                                                    fieldId="username" isRequired isValid={!this.isAlreadyShared()}>
                                <react_core_1.Gallery gutter='sm'>
                                    <react_core_1.GalleryItem>
                                        <react_core_1.TextInput value={this.state.usernameInput}
                                                                isValid={!this.isAlreadyShared()} id="username"
                                                                aria-describedby="username-helper"
                                                                placeholder="Username or email"
                                                                onChange={this.handleUsernameChange}
                                                                onKeyPress={this.handleEnterKeyInAddField}/>
                                    </react_core_1.GalleryItem>
                                    <react_core_1.GalleryItem>
                                        <react_core_1.Button key="add-user" variant="primary" id="add"
                                                             onClick={this.handleAddUsername}
                                                             isDisabled={this.isAddDisabled()}>
                                            <Msg_1.Msg msgKey="add"/>
                                        </react_core_1.Button>
                                    </react_core_1.GalleryItem>

                                </react_core_1.Gallery>
                                <react_core_1.ChipGroup withToolbar>
                                    <react_core_1.ChipGroupToolbarItem key='users-selected' categoryName='Share with '>
                                        {this.state.usernames.map((currentChip) => (<react_core_1.Chip key={currentChip}
                                                                                                       onClick={() => this.handleDeleteUsername(currentChip)}>
                                            {currentChip}
                                        </react_core_1.Chip>))}
                                    </react_core_1.ChipGroupToolbarItem>
                                </react_core_1.ChipGroup>
                            </react_core_1.FormGroup>
                            <react_core_1.FormGroup label="" fieldId="permissions-selected">
                                <PermissionSelect_1.PermissionSelect scopes={this.state.permissionsUnSelected}
                                                                     onSelect={selection => this.setState({permissionsSelected: selection})}
                                                                     direction="up"/>
                            </react_core_1.FormGroup>
                        </react_core_1.Form>
                    </react_core_1.StackItem>
                    <react_core_1.StackItem isFilled><br/></react_core_1.StackItem>
                    <react_core_1.StackItem isFilled>
                        {this.props.sharedWithUsersMsg}
                    </react_core_1.StackItem>

                </react_core_1.Stack>
            </react_core_1.Modal>
        </React.Fragment>);
    }
}

exports.ShareTheResource = ShareTheResource;
ShareTheResource.defaultProps = {permissions: []};
ShareTheResource.contextType = AccountServiceContext_1.AccountServiceContext;
//# sourceMappingURL=ShareTheResource.jsx.map