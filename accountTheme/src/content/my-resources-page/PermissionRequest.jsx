"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
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
const React = require("react");
const react_core_1 = require("@patternfly/react-core");
const react_icons_1 = require("@patternfly/react-icons");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const Msg_1 = require("../../widgets/Msg");
const ContentAlert_1 = require("../ContentAlert");

class PermissionRequest extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleApprove = async (shareRequest, index) => {
            this.handle(shareRequest.username, shareRequest.scopes, true);
            this.props.resource.shareRequests.splice(index, 1);
        };
        this.handleDeny = async (shareRequest, index) => {
            this.handle(shareRequest.username, shareRequest.scopes);
            this.props.resource.shareRequests.splice(index, 1);
        };
        this.handle = async (username, scopes, approve = false) => {
            const id = this.props.resource._id;
            this.handleToggleDialog();
            const permissionsRequest = await this.context.doGet(`/resources/${id}/permissions`);
            const permissions = permissionsRequest.data || [];
            const foundPermission = permissions.find(p => p.username === username);
            const userScopes = foundPermission ? foundPermission.scopes : [];
            if (approve) {
                userScopes.push(...scopes);
            }
            try {
                await this.context.doPut(`/resources/${id}/permissions`, [{username: username, scopes: userScopes}]);
                ContentAlert_1.ContentAlert.success(Msg_1.Msg.localize('shareSuccess'));
                this.props.onClose();
            } catch (e) {
                console.error('Could not update permissions', e.error);
            }
        };
        this.handleToggleDialog = () => {
            this.setState({isOpen: !this.state.isOpen});
        };
        this.context = context;
        this.state = {
            isOpen: false,
        };
    }

    render() {
        const id = `shareRequest-${this.props.resource.name.replace(/\s/, '-')}`;
        return (<React.Fragment>
            <react_core_1.Button id={id} variant="link" onClick={this.handleToggleDialog}>
                <react_icons_1.UserCheckIcon size="lg"/>
                <react_core_1.Badge>{this.props.resource.shareRequests.length}</react_core_1.Badge>
            </react_core_1.Button>

            <react_core_1.Modal id={`modal-${id}`}
                                title={Msg_1.Msg.localize('permissionRequests') + ' - ' + this.props.resource.name}
                                isLarge={true} isOpen={this.state.isOpen} onClose={this.handleToggleDialog} actions={[
                <react_core_1.Button id={`close-${id}`} key="close" variant="link" onClick={this.handleToggleDialog}>
                    <Msg_1.Msg msgKey="close"/>
                </react_core_1.Button>,
            ]}>
                <react_core_1.DataList aria-label={Msg_1.Msg.localize('permissionRequests')}>
                    <react_core_1.DataListItemRow>
                        <react_core_1.DataListItemCells dataListCells={[
                            <react_core_1.DataListCell key='permissions-name-header' width={5}>
                                <strong>Requestor</strong>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key='permissions-requested-header' width={5}>
                                <strong><Msg_1.Msg msgKey='permissionRequests'/></strong>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key='permission-request-header' width={5}>
                            </react_core_1.DataListCell>
                        ]}/>
                    </react_core_1.DataListItemRow>
                    {this.props.resource.shareRequests.map((shareRequest, i) => <react_core_1.DataListItem key={i}
                                                                                                           aria-labelledby="requestor">
                        <react_core_1.DataListItemRow>
                            <react_core_1.DataListItemCells dataListCells={[
                                <react_core_1.DataListCell id={`requestor${i}`} key={`requestor${i}`}>
                                                <span>
                                                    {shareRequest.firstName} {shareRequest.lastName} {shareRequest.lastName ? '' : shareRequest.username}
                                                </span><br/>
                                    <react_core_1.Text
                                        component={react_core_1.TextVariants.small}>{shareRequest.email}</react_core_1.Text>
                                </react_core_1.DataListCell>,
                                <react_core_1.DataListCell id={`permissions${i}`} key={`permissions${i}`}>
                                    {shareRequest.scopes.map((scope, j) => <react_core_1.Chip key={j}
                                                                                              isReadOnly>{scope}</react_core_1.Chip>)}
                                </react_core_1.DataListCell>,
                                <react_core_1.DataListCell key={`actions${i}`}>
                                    <react_core_1.Split gutter="sm">
                                        <react_core_1.SplitItem>
                                            <react_core_1.Button id={`accept-${i}-${id}`}
                                                                 onClick={() => this.handleApprove(shareRequest, i)}>
                                                Accept
                                            </react_core_1.Button>
                                        </react_core_1.SplitItem>
                                        <react_core_1.SplitItem>
                                            <react_core_1.Button id={`deny-${i}-${id}`} variant="danger"
                                                                 onClick={() => this.handleDeny(shareRequest, i)}>
                                                Deny
                                            </react_core_1.Button>
                                        </react_core_1.SplitItem>
                                    </react_core_1.Split>
                                </react_core_1.DataListCell>
                            ]}/>
                        </react_core_1.DataListItemRow>
                    </react_core_1.DataListItem>)}
                </react_core_1.DataList>
            </react_core_1.Modal>
        </React.Fragment>);
    }
}

exports.PermissionRequest = PermissionRequest;
PermissionRequest.defaultProps = {permissions: [], row: 0};
PermissionRequest.contextType = AccountServiceContext_1.AccountServiceContext;
//# sourceMappingURL=PermissionRequest.jsx.map