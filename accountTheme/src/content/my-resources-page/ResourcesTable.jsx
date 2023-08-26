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
const react_core_1 = require("@patternfly/react-core");
const react_styles_1 = require("@patternfly/react-styles");
const react_icons_1 = require("@patternfly/react-icons");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const PermissionRequest_1 = require("./PermissionRequest");
const ShareTheResource_1 = require("./ShareTheResource");
const Msg_1 = require("../../widgets/Msg");
const AbstractResourceTable_1 = require("./AbstractResourceTable");
const EditTheResource_1 = require("./EditTheResource");
const ContentAlert_1 = require("../ContentAlert");
const EmptyMessageState_1 = require("../../widgets/EmptyMessageState");
const ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");

class ResourcesTable extends AbstractResourceTable_1.AbstractResourcesTable {
    constructor(props, context) {
        super(props);
        this.onToggle = (row) => {
            const newIsRowOpen = this.state.isRowOpen;
            newIsRowOpen[row] = !newIsRowOpen[row];
            if (newIsRowOpen[row])
                this.fetchPermissions(this.props.resources.data[row], row);
            this.setState({isRowOpen: newIsRowOpen});
        };
        this.onContextToggle = (row, isOpen) => {
            if (this.state.isModalActive)
                return;
            const data = this.props.resources.data;
            const contextOpen = this.state.contextOpen;
            contextOpen[row] = isOpen;
            if (isOpen) {
                const index = row > data.length ? row - data.length - 1 : row;
                this.fetchPermissions(data[index], index);
            }
            this.setState({contextOpen});
        };
        this.context = context;
        this.state = {
            isRowOpen: [],
            contextOpen: [],
            isModalActive: false,
            permissions: new Map()
        };
    }

    fetchPermissions(resource, row) {
        this.context.doGet(`/resources/${resource._id}/permissions`)
            .then((response) => {
                const newPermissions = new Map(this.state.permissions);
                newPermissions.set(row, response.data || []);
                this.setState({permissions: newPermissions});
            });
    }

    removeShare(resource, row) {
        const permissions = this.state.permissions.get(row).map(a => ({username: a.username, scopes: []}));
        return this.context.doPut(`/resources/${resource._id}/permissions`, permissions)
            .then(() => {
                ContentAlert_1.ContentAlert.success(Msg_1.Msg.localize('unShareSuccess'));
            });
    }

    render() {
        if (this.props.resources.data.length === 0) {
            return (<EmptyMessageState_1.default icon={react_icons_1.RepositoryIcon} messageKey="notHaveAnyResource"/>);
        }
        return (<react_core_1.DataList aria-label={Msg_1.Msg.localize('resources')} id="resourcesList">
            <react_core_1.DataListItem key='resource-header' aria-labelledby='resource-header'>
                <react_core_1.DataListItemRow>
                    // invisible toggle allows headings to line up properly
                    <span style={{visibility: 'hidden'}}>
                            <react_core_1.DataListToggle isExpanded={false} id='resource-header-invisible-toggle'
                                                         aria-controls="ex-expand1"/>
                        </span>
                    <react_core_1.DataListItemCells dataListCells={[
                        <react_core_1.DataListCell key='resource-name-header' width={5}>
                            <strong><Msg_1.Msg msgKey='resourceName'/></strong>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='application-name-header' width={5}>
                            <strong><Msg_1.Msg msgKey='application'/></strong>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='permission-request-header' width={5}>
                            <strong><Msg_1.Msg msgKey='permissionRequests'/></strong>
                        </react_core_1.DataListCell>,
                    ]}/>
                </react_core_1.DataListItemRow>
            </react_core_1.DataListItem>
            {this.props.resources.data.map((resource, row) => (
                <react_core_1.DataListItem key={'resource-' + row} aria-labelledby={resource.name}
                                           isExpanded={this.state.isRowOpen[row]}>
                    <react_core_1.DataListItemRow>
                        <react_core_1.DataListToggle onClick={() => this.onToggle(row)}
                                                     isExpanded={this.state.isRowOpen[row]} id={'resourceToggle-' + row}
                                                     aria-controls="ex-expand1"/>
                        <react_core_1.DataListItemCells dataListCells={[
                            <react_core_1.DataListCell id={'resourceName-' + row} key={'resourceName-' + row} width={5}>
                                <Msg_1.Msg msgKey={resource.name}/>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell id={'resourceClient-' + row} key={'resourceClient-' + row}
                                                       width={5}>
                                <a href={resource.client.baseUrl}>{this.getClientName(resource.client)}</a>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell id={'resourceRequests-' + row} key={'permissionRequests-' + row}
                                                       width={5}>
                                {resource.shareRequests.length > 0 &&
                                    <PermissionRequest_1.PermissionRequest resource={resource}
                                                                           onClose={() => this.fetchPermissions(resource, row)}></PermissionRequest_1.PermissionRequest>}
                            </react_core_1.DataListCell>
                        ]}/>
                        <react_core_1.DataListAction className={react_core_1.DataListActionVisibility.hiddenOnLg}
                                                     aria-labelledby="check-action-item3 check-action-action3"
                                                     id="check-action-action3" aria-label="Actions">
                            <react_core_1.Dropdown isPlain position={react_core_1.DropdownPosition.right}
                                                   onSelect={() => this.setState({isModalActive: true})}
                                                   toggle={<react_core_1.KebabToggle
                                                       onToggle={isOpen => this.onContextToggle(row + this.props.resources.data.length + 1, isOpen)}/>}
                                                   isOpen={this.state.contextOpen[row + this.props.resources.data.length + 1]}
                                                   dropdownItems={[
                                                       <ShareTheResource_1.ShareTheResource resource={resource}
                                                                                            permissions={this.state.permissions.get(row)}
                                                                                            sharedWithUsersMsg={this.sharedWithUsersMessage(row)}
                                                                                            onClose={() => {
                                                                                                this.setState({isModalActive: false}, () => {
                                                                                                    this.onContextToggle(row + this.props.resources.data.length + 1, false);
                                                                                                    this.fetchPermissions(resource, row + this.props.resources.data.length + 1);
                                                                                                });
                                                                                            }}>
                                                           {(toggle) => (
                                                               <react_core_1.DropdownItem id={'mob-share-' + row}
                                                                                          key="mob-share"
                                                                                          onClick={toggle}>
                                                                   <react_icons_1.ShareAltIcon/>
                                                                   <Msg_1.Msg msgKey="share"/>
                                                               </react_core_1.DropdownItem>)}
                                                       </ShareTheResource_1.ShareTheResource>,
                                                       <EditTheResource_1.EditTheResource resource={resource}
                                                                                          permissions={this.state.permissions.get(row)}
                                                                                          onClose={() => {
                                                                                              this.setState({isModalActive: false}, () => {
                                                                                                  this.onContextToggle(row + this.props.resources.data.length + 1, false);
                                                                                                  this.fetchPermissions(resource, row + this.props.resources.data.length + 1);
                                                                                              });
                                                                                          }}>
                                                           {(toggle) => (
                                                               <react_core_1.DropdownItem id={'mob-edit-' + row}
                                                                                          key="mob-edit"
                                                                                          isDisabled={this.numOthers(row) < 0}
                                                                                          onClick={toggle}>
                                                                   <react_icons_1.EditAltIcon/>
                                                                   <Msg_1.Msg msgKey="edit"/>
                                                               </react_core_1.DropdownItem>)}
                                                       </EditTheResource_1.EditTheResource>,
                                                       <ContinueCancelModal_1.ContinueCancelModal render={(toggle) => (
                                                           <react_core_1.DropdownItem id={'mob-remove-' + row}
                                                                                      key="mob-remove"
                                                                                      isDisabled={this.numOthers(row) < 0}
                                                                                      onClick={toggle}>
                                                               <react_icons_1.Remove2Icon/>
                                                               <Msg_1.Msg msgKey="unShare"/>
                                                           </react_core_1.DropdownItem>)} modalTitle="unShare"
                                                                                                  modalMessage="unShareAllConfirm"
                                                                                                  onClose={() => this.setState({isModalActive: false}, () => {
                                                                                                      this.onContextToggle(row + this.props.resources.data.length + 1, false);
                                                                                                  })}
                                                                                                  onContinue={() => this.removeShare(resource, row)
                                                                                                      .then(() => this.fetchPermissions(resource, row + this.props.resources.data.length + 1))}/>
                                                   ]}/>
                        </react_core_1.DataListAction>
                        <react_core_1.DataListAction id={`actions-${row}`}
                                                     className={react_styles_1.css(react_core_1.DataListActionVisibility.visibleOnLg, react_core_1.DataListActionVisibility.hidden)}
                                                     aria-labelledby="Row actions" aria-label="Actions">
                            <ShareTheResource_1.ShareTheResource resource={resource}
                                                                 permissions={this.state.permissions.get(row)}
                                                                 sharedWithUsersMsg={this.sharedWithUsersMessage(row)}
                                                                 onClose={() => this.fetchPermissions(resource, row)}>
                                {(toggle) => (<react_core_1.Button id={`share-${row}`} variant="link" onClick={toggle}>
                                    <react_icons_1.ShareAltIcon/>
                                    <Msg_1.Msg msgKey="share"/>
                                </react_core_1.Button>)}
                            </ShareTheResource_1.ShareTheResource>
                            <react_core_1.Dropdown id={`action-menu-${row}`} isPlain
                                                   position={react_core_1.DropdownPosition.right}
                                                   toggle={<react_core_1.KebabToggle
                                                       onToggle={isOpen => this.onContextToggle(row, isOpen)}/>}
                                                   onSelect={() => this.setState({isModalActive: true})}
                                                   isOpen={this.state.contextOpen[row]} dropdownItems={[
                                <EditTheResource_1.EditTheResource resource={resource}
                                                                   permissions={this.state.permissions.get(row)}
                                                                   onClose={() => {
                                                                       this.setState({isModalActive: false}, () => {
                                                                           this.onContextToggle(row, false);
                                                                           this.fetchPermissions(resource, row);
                                                                       });
                                                                   }}>
                                    {(toggle) => (
                                        <react_core_1.DropdownItem id={'edit-' + row} key="edit" component="button"
                                                                   isDisabled={this.numOthers(row) < 0}
                                                                   onClick={toggle}>
                                            <react_icons_1.EditAltIcon/>
                                            <Msg_1.Msg msgKey="edit"/>
                                        </react_core_1.DropdownItem>)}
                                </EditTheResource_1.EditTheResource>,
                                <ContinueCancelModal_1.ContinueCancelModal render={(toggle) => (
                                    <react_core_1.DropdownItem id={'remove-' + row} key="remove" component="button"
                                                               isDisabled={this.numOthers(row) < 0} onClick={toggle}>
                                        <react_icons_1.Remove2Icon/>
                                        <Msg_1.Msg msgKey="unShare"/>
                                    </react_core_1.DropdownItem>)} modalTitle="unShare" modalMessage='unShareAllConfirm'
                                                                           onClose={() => this.setState({isModalActive: false}, () => {
                                                                               this.onContextToggle(row, false);
                                                                           })}
                                                                           onContinue={() => this.removeShare(resource, row).then(() => this.fetchPermissions(resource, row))}/>
                            ]}/>
                        </react_core_1.DataListAction>

                    </react_core_1.DataListItemRow>
                    <react_core_1.DataListContent noPadding={false} aria-label="Session Details" id={'ex-expand' + row}
                                                  isHidden={!this.state.isRowOpen[row]}>
                        <react_core_1.Level gutter='md'>
                            <react_core_1.LevelItem><span/></react_core_1.LevelItem>
                            <react_core_1.LevelItem
                                id={'shared-with-user-message-' + row}>{this.sharedWithUsersMessage(row)}</react_core_1.LevelItem>
                            <react_core_1.LevelItem><span/></react_core_1.LevelItem>
                        </react_core_1.Level>
                    </react_core_1.DataListContent>
                </react_core_1.DataListItem>))}
        </react_core_1.DataList>);
    }
}

exports.ResourcesTable = ResourcesTable;
ResourcesTable.contextType = AccountServiceContext_1.AccountServiceContext;
//# sourceMappingURL=ResourcesTable.jsx.map