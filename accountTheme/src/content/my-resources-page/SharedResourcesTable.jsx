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
const react_icons_1 = require("@patternfly/react-icons");
const Msg_1 = require("../../widgets/Msg");
const AbstractResourceTable_1 = require("./AbstractResourceTable");
const EmptyMessageState_1 = require("../../widgets/EmptyMessageState");

class SharedResourcesTable extends AbstractResourceTable_1.AbstractResourcesTable {
    constructor(props) {
        super(props);
        this.state = {
            permissions: new Map()
        };
    }

    render() {
        if (this.props.resources.data.length === 0) {
            return (<EmptyMessageState_1.default icon={react_icons_1.RepositoryIcon}
                                                 messageKey="noResourcesSharedWithYou"/>);
        }
        return (<react_core_1.DataList aria-label={Msg_1.Msg.localize('resources')} id="sharedResourcesList">
            <react_core_1.DataListItem key='resource-header' aria-labelledby='resource-header'>
                <react_core_1.DataListItemRow>
                    <react_core_1.DataListItemCells dataListCells={[
                        <react_core_1.DataListCell key='resource-name-header' width={2}>
                            <strong><Msg_1.Msg msgKey='resourceName'/></strong>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='application-name-header' width={2}>
                            <strong><Msg_1.Msg msgKey='application'/></strong>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='permission-header' width={2}/>,
                        <react_core_1.DataListCell key='requests-header' width={2}/>,
                    ]}/>
                </react_core_1.DataListItemRow>
            </react_core_1.DataListItem>
            {this.props.resources.data.map((resource, row) => (
                <react_core_1.DataListItem key={'resource-' + row} aria-labelledby={resource.name}>
                    <react_core_1.DataListItemRow>
                        <react_core_1.DataListItemCells dataListCells={[
                            <react_core_1.DataListCell key={'resourceName-' + row} width={2}>
                                <Msg_1.Msg msgKey={resource.name}/>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key={'resourceClient-' + row} width={2}>
                                <a href={resource.client.baseUrl}>{this.getClientName(resource.client)}</a>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key={'permissions-' + row} width={2}>
                                {resource.scopes.length > 0 &&
                                    <react_core_1.ChipGroup withToolbar>
                                        <react_core_1.ChipGroupToolbarItem key='permissions'
                                                                           categoryName={Msg_1.Msg.localize('permissions')}>
                                            {resource.scopes.map(scope => (
                                                <react_core_1.Chip key={scope.name} isReadOnly>
                                                    {scope.displayName || scope.name}
                                                </react_core_1.Chip>))}
                                        </react_core_1.ChipGroupToolbarItem>
                                    </react_core_1.ChipGroup>}
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key={'pending-' + row} width={2}>
                                {resource.shareRequests.length > 0 &&
                                    <react_core_1.ChipGroup withToolbar>
                                        <react_core_1.ChipGroupToolbarItem key='permissions'
                                                                           categoryName={Msg_1.Msg.localize('pending')}>
                                            {resource.shareRequests[0].scopes.map(scope => (
                                                <react_core_1.Chip key={scope.name} isReadOnly>
                                                    {scope.displayName || scope.name}
                                                </react_core_1.Chip>))}
                                        </react_core_1.ChipGroupToolbarItem>
                                    </react_core_1.ChipGroup>}
                            </react_core_1.DataListCell>
                        ]}/>
                    </react_core_1.DataListItemRow>
                </react_core_1.DataListItem>))}
        </react_core_1.DataList>);
    }
}

exports.SharedResourcesTable = SharedResourcesTable;
//# sourceMappingURL=SharedResourcesTable.jsx.map