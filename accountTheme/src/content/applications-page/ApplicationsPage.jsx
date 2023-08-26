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
const ContentPage_1 = require("../ContentPage");
const ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const Msg_1 = require("../../widgets/Msg");

class ApplicationsPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.removeConsent = (clientId) => {
            this.context.doDelete("/applications/" + clientId + "/consent")
                .then(() => {
                    this.fetchApplications();
                });
        };
        this.onToggle = (row) => {
            const newIsRowOpen = this.state.isRowOpen;
            newIsRowOpen[row] = !newIsRowOpen[row];
            this.setState({isRowOpen: newIsRowOpen});
        };
        this.context = context;
        this.state = {
            isRowOpen: [],
            applications: []
        };
        this.fetchApplications();
    }

    fetchApplications() {
        this.context.doGet("/applications")
            .then((response) => {
                const applications = response.data || [];
                this.setState({
                    isRowOpen: new Array(applications.length).fill(false),
                    applications: applications
                });
            });
    }

    elementId(item, application) {
        return `application-${item}-${application.clientId}`;
    }

    render() {
        return (<ContentPage_1.ContentPage title={Msg_1.Msg.localize('applicationsPageTitle')}>
            <react_core_1.DataList id="applications-list" aria-label={Msg_1.Msg.localize('applicationsPageTitle')}
                                   isCompact>
                <react_core_1.DataListItem id="applications-list-header" aria-labelledby="Columns names">
                    <react_core_1.DataListItemRow>
                        // invisible toggle allows headings to line up properly
                        <span style={{visibility: 'hidden'}}>
                <react_core_1.DataListToggle isExpanded={false} id='applications-list-header-invisible-toggle'
                                             aria-controls="hidden"/>
              </span>
                        <react_core_1.DataListItemCells dataListCells={[
                            <react_core_1.DataListCell key='applications-list-client-id-header' width={2}>
                                <strong><Msg_1.Msg msgKey='applicationName'/></strong>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key='applications-list-app-type-header' width={2}>
                                <strong><Msg_1.Msg msgKey='applicationType'/></strong>
                            </react_core_1.DataListCell>,
                            <react_core_1.DataListCell key='applications-list-status' width={2}>
                                <strong><Msg_1.Msg msgKey='status'/></strong>
                            </react_core_1.DataListCell>,
                        ]}/>
                    </react_core_1.DataListItemRow>
                </react_core_1.DataListItem>
                {this.state.applications.map((application, appIndex) => {
                    return (<react_core_1.DataListItem id={this.elementId("client-id", application)}
                                                       key={'application-' + appIndex}
                                                       aria-labelledby="applications-list"
                                                       isExpanded={this.state.isRowOpen[appIndex]}>
                        <react_core_1.DataListItemRow>
                            <react_core_1.DataListToggle onClick={() => this.onToggle(appIndex)}
                                                         isExpanded={this.state.isRowOpen[appIndex]}
                                                         id={this.elementId('toggle', application)}
                                                         aria-controls={this.elementId("expandable", application)}/>
                            <react_core_1.DataListItemCells dataListCells={[
                                <react_core_1.DataListCell id={this.elementId('name', application)} width={2}
                                                           key={'app-' + appIndex}>
                                    <react_core_1.Button component="a" variant="link"
                                                         onClick={() => window.open(application.effectiveUrl)}>
                                        {application.clientName || application.clientId}
                                        <react_icons_1.ExternalLinkAltIcon/>
                                    </react_core_1.Button>
                                </react_core_1.DataListCell>,
                                <react_core_1.DataListCell id={this.elementId('internal', application)} width={2}
                                                           key={'internal-' + appIndex}>
                                    {application.userConsentRequired ? Msg_1.Msg.localize('thirdPartyApp') : Msg_1.Msg.localize('internalApp')}
                                    {application.offlineAccess ? ', ' + Msg_1.Msg.localize('offlineAccess') : ''}
                                </react_core_1.DataListCell>,
                                <react_core_1.DataListCell id={this.elementId('status', application)} width={2}
                                                           key={'status-' + appIndex}>
                                    {application.inUse ? Msg_1.Msg.localize('inUse') : Msg_1.Msg.localize('notInUse')}
                                </react_core_1.DataListCell>
                            ]}/>
                        </react_core_1.DataListItemRow>
                        <react_core_1.DataListContent noPadding={false}
                                                      aria-label={Msg_1.Msg.localize('applicationDetails')}
                                                      id={this.elementId("expandable", application)}
                                                      isHidden={!this.state.isRowOpen[appIndex]}>
                            <react_core_1.Grid sm={6} md={6} lg={6}>
                                <div className='pf-c-content'>
                                    <react_core_1.GridItem>
                                        <strong>{Msg_1.Msg.localize('client') + ': '}</strong> {application.clientId}
                                    </react_core_1.GridItem>
                                    {application.description &&
                                        <react_core_1.GridItem>
                                            <strong>{Msg_1.Msg.localize('description') + ': '}</strong> {application.description}
                                        </react_core_1.GridItem>}
                                    {application.effectiveUrl &&
                                        <react_core_1.GridItem><strong>URL: </strong> <span
                                            id={this.elementId('effectiveurl', application)}>{application.effectiveUrl.split('"')}</span>
                                        </react_core_1.GridItem>}
                                    {application.consent &&
                                        <React.Fragment>
                                            <react_core_1.GridItem span={12}>
                                                <strong>Has access to:</strong>
                                            </react_core_1.GridItem>
                                            {application.consent.grantedScopes.map((scope, scopeIndex) => {
                                                return (<React.Fragment key={'scope-' + scopeIndex}>
                                                    <react_core_1.GridItem offset={1}>
                                                        <react_icons_1.CheckIcon/>
                                                        {scope.name}</react_core_1.GridItem>
                                                </React.Fragment>);
                                            })}
                                            {application.tosUri && <react_core_1.GridItem>
                                                <strong>{Msg_1.Msg.localize('termsOfService') + ': '}</strong>{application.tosUri}
                                            </react_core_1.GridItem>}
                                            {application.policyUri && <react_core_1.GridItem>
                                                <strong>{Msg_1.Msg.localize('policy') + ': '}</strong>{application.policyUri}
                                            </react_core_1.GridItem>}
                                            <react_core_1.GridItem>
                                                <strong>{Msg_1.Msg.localize('accessGrantedOn') + ': '}</strong>
                                                {new Intl.DateTimeFormat(locale, {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    second: 'numeric'
                                                }).format(application.consent.createDate)}
                                            </react_core_1.GridItem>
                                        </React.Fragment>}
                                </div>
                                {application.logoUri &&
                                    <div className='pf-c-content'><img src={application.logoUri}/></div>}
                            </react_core_1.Grid>
                            {(application.consent || application.offlineAccess) &&
                                <react_core_1.Grid gutter='sm'>
                                    <hr/>
                                    <react_core_1.GridItem>
                                        <React.Fragment>
                                            <ContinueCancelModal_1.ContinueCancelModal
                                                buttonTitle={Msg_1.Msg.localize('removeButton')} // required
                                                buttonVariant='secondary' // defaults to 'primary'
                                                modalTitle={Msg_1.Msg.localize('removeModalTitle')} // required
                                                modalMessage={Msg_1.Msg.localize('removeModalMessage', [application.clientId])}
                                                modalContinueButtonLabel={Msg_1.Msg.localize('confirmButton')} // defaults to 'Continue'
                                                onContinue={() => this.removeConsent(application.clientId)} // required
                                            />
                                        </React.Fragment>
                                    </react_core_1.GridItem>
                                    <react_core_1.GridItem>
                                        <react_icons_1.InfoAltIcon/>
                                        {Msg_1.Msg.localize('infoMessage')}</react_core_1.GridItem>
                                </react_core_1.Grid>}
                        </react_core_1.DataListContent>
                    </react_core_1.DataListItem>);
                })}
            </react_core_1.DataList>
        </ContentPage_1.ContentPage>);
    }
}

exports.ApplicationsPage = ApplicationsPage;
ApplicationsPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
//# sourceMappingURL=ApplicationsPage.jsx.map