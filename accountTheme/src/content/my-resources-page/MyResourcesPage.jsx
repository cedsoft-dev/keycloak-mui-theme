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
const ParseLink_1 = require("../../util/ParseLink");
const react_core_1 = require("@patternfly/react-core");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const resource_model_1 = require("./resource-model");
const ResourcesTable_1 = require("./ResourcesTable");
const ContentPage_1 = require("../ContentPage");
const Msg_1 = require("../../widgets/Msg");
const SharedResourcesTable_1 = require("./SharedResourcesTable");
const MY_RESOURCES_TAB = 0;
const SHARED_WITH_ME_TAB = 1;

class MyResourcesPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.first = 0;
        this.max = 5;
        this.makeScopeObj = (scope) => {
            return new resource_model_1.Scope(scope.name, scope.displayName);
        };
        this.fetchPermissionRequests = () => {
            this.state.myResources.data.forEach((resource) => {
                this.fetchShareRequests(resource);
            });
        };
        this.fetchPending = async () => {
            const response = await this.context.doGet(`/resources/pending-requests`);
            const resources = response.data || [];
            resources.forEach((pendingRequest) => {
                this.state.sharedWithMe.data.forEach(resource => {
                    if (resource._id === pendingRequest._id) {
                        resource.shareRequests = [{username: 'me', scopes: pendingRequest.scopes}];
                        this.forceUpdate();
                    }
                });
            });
        };
        this.handleFilterRequest = (value) => {
            this.setState({nameFilter: value});
            this.fetchFilteredResources({name: value});
        };
        this.handleFirstPageClick = () => {
            this.fetchInitialResources();
        };
        this.handleNextClick = () => {
            if (this.isSharedWithMeTab()) {
                this.fetchResources(this.state.sharedWithMe.nextUrl);
            } else {
                this.fetchResources(this.state.myResources.nextUrl);
            }
        };
        this.handlePreviousClick = () => {
            if (this.isSharedWithMeTab()) {
                this.fetchResources(this.state.sharedWithMe.prevUrl);
            } else {
                this.fetchResources(this.state.myResources.prevUrl);
            }
        };
        this.handleTabClick = (event, tabIndex) => {
            if (this.state.activeTabKey === tabIndex)
                return;
            this.setState({
                nameFilter: '',
                activeTabKey: tabIndex
            }, () => {
                this.fetchInitialResources();
            });
        };
        this.context = context;
        this.state = {
            activeTabKey: MY_RESOURCES_TAB,
            nameFilter: '',
            isModalOpen: false,
            myResources: {nextUrl: '', prevUrl: '', data: []},
            sharedWithMe: {nextUrl: '', prevUrl: '', data: []}
        };
        this.fetchInitialResources();
    }

    isSharedWithMeTab() {
        return this.state.activeTabKey === SHARED_WITH_ME_TAB;
    }

    hasNext() {
        if (this.isSharedWithMeTab()) {
            return (this.state.sharedWithMe.nextUrl !== null) && (this.state.sharedWithMe.nextUrl !== '');
        } else {
            return (this.state.myResources.nextUrl !== null) && (this.state.myResources.nextUrl !== '');
        }
    }

    hasPrevious() {
        if (this.isSharedWithMeTab()) {
            return (this.state.sharedWithMe.prevUrl !== null) && (this.state.sharedWithMe.prevUrl !== '');
        } else {
            return (this.state.myResources.prevUrl !== null) && (this.state.myResources.prevUrl !== '');
        }
    }

    fetchInitialResources() {
        if (this.isSharedWithMeTab()) {
            this.fetchResources("/resources/shared-with-me");
        } else {
            this.fetchResources("/resources", {first: this.first, max: this.max});
        }
    }

    fetchFilteredResources(params) {
        if (this.isSharedWithMeTab()) {
            this.fetchResources("/resources/shared-with-me", params);
        } else {
            this.fetchResources("/resources", {...params, first: this.first, max: this.max});
        }
    }

    fetchResources(url, extraParams) {
        this.context.doGet(url, {params: extraParams})
            .then((response) => {
                const resources = response.data || [];
                resources.forEach((resource) => resource.shareRequests = []);
                // serialize the Scope objects from JSON so that toString() will work.
                resources.forEach((resource) => resource.scopes = resource.scopes.map(this.makeScopeObj));
                if (this.isSharedWithMeTab()) {
                    this.setState({sharedWithMe: this.parseResourceResponse(response)}, this.fetchPending);
                } else {
                    this.setState({myResources: this.parseResourceResponse(response)}, this.fetchPermissionRequests);
                }
            });
    }

    fetchShareRequests(resource) {
        this.context.doGet('/resources/' + resource._id + '/permissions/requests')
            .then((response) => {
                resource.shareRequests = response.data || [];
                if (resource.shareRequests.length > 0) {
                    this.forceUpdate();
                }
            });
    }

    parseResourceResponse(response) {
        const links = response.headers.get('link') || undefined;
        const parsed = ParseLink_1.default(links);
        let next = '';
        let prev = '';
        if (parsed !== null) {
            if (parsed.next)
                next = parsed.next;
            if (parsed.prev)
                prev = parsed.prev;
        }
        const resources = response.data || [];
        return {nextUrl: next, prevUrl: prev, data: resources};
    }

    makeTab(eventKey, title, resources, sharedResourcesTab) {
        return (<react_core_1.Tab id={title} eventKey={eventKey} title={Msg_1.Msg.localize(title)}>
            <react_core_1.Stack gutter="md">
                <react_core_1.StackItem isFilled><span/></react_core_1.StackItem>
                <react_core_1.StackItem isFilled>
                    <react_core_1.Level gutter='md'>
                        <react_core_1.LevelItem>
                            <react_core_1.TextInput value={this.state.nameFilter} onChange={this.handleFilterRequest}
                                                    id={'filter-' + title} type="text"
                                                    placeholder={Msg_1.Msg.localize('filterByName')}/>
                        </react_core_1.LevelItem>
                    </react_core_1.Level>
                </react_core_1.StackItem>
                <react_core_1.StackItem isFilled>
                    {!sharedResourcesTab && <ResourcesTable_1.ResourcesTable resources={resources}/>}
                    {sharedResourcesTab && <SharedResourcesTable_1.SharedResourcesTable resources={resources}/>}
                </react_core_1.StackItem>
            </react_core_1.Stack>
        </react_core_1.Tab>);
    }

    render() {
        return (<ContentPage_1.ContentPage title="resources" onRefresh={this.fetchInitialResources.bind(this)}>
            <react_core_1.Tabs isFilled activeKey={this.state.activeTabKey} onSelect={this.handleTabClick}>
                {this.makeTab(0, 'myResources', this.state.myResources, false)}
                {this.makeTab(1, 'sharedwithMe', this.state.sharedWithMe, true)}
            </react_core_1.Tabs>

            <react_core_1.Level gutter='md'>
                <react_core_1.LevelItem>
                    {this.hasPrevious() &&
                        <react_core_1.Button onClick={this.handlePreviousClick}>&lt;<Msg_1.Msg msgKey='previousPage'/>
                        </react_core_1.Button>}
                </react_core_1.LevelItem>

                <react_core_1.LevelItem>
                    {this.hasPrevious() &&
                        <react_core_1.Button onClick={this.handleFirstPageClick}><Msg_1.Msg msgKey='firstPage'/>
                        </react_core_1.Button>}
                </react_core_1.LevelItem>

                <react_core_1.LevelItem>
                    {this.hasNext() &&
                        <react_core_1.Button onClick={this.handleNextClick}><Msg_1.Msg msgKey='nextPage'/>&gt;
                        </react_core_1.Button>}
                </react_core_1.LevelItem>
            </react_core_1.Level>
        </ContentPage_1.ContentPage>);
    }

    clearNextPrev() {
        const newMyResources = this.state.myResources;
        newMyResources.nextUrl = '';
        newMyResources.prevUrl = '';
        this.setState({myResources: newMyResources});
    }
}

exports.MyResourcesPage = MyResourcesPage;
MyResourcesPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
//# sourceMappingURL=MyResourcesPage.jsx.map