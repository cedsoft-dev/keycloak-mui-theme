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
const react_router_dom_1 = require("react-router-dom");
const react_core_1 = require("@patternfly/react-core");
const AIACommand_1 = require("../../util/AIACommand");
const TimeUtil_1 = require("../../util/TimeUtil");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
const Msg_1 = require("../../widgets/Msg");
const ContentPage_1 = require("../ContentPage");
const ContentAlert_1 = require("../ContentAlert");
const KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
const react_styles_1 = require("@patternfly/react-styles");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
class SigningInPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.handleRemove = (credentialId, userLabel) => {
            this.context.doDelete("/credentials/" + credentialId)
                .then(() => {
                    this.getCredentialContainers();
                    ContentAlert_1.ContentAlert.success('successRemovedMessage', [userLabel]);
                });
        };
        this.context = context;
        this.state = {
            credentialContainers: new Map(),
        };
        this.getCredentialContainers();
    }

    getCredentialContainers() {
        this.context.doGet("/credentials")
            .then((response) => {
                const allContainers = new Map();
                const containers = response.data || [];
                containers.forEach(container => {
                    let categoryMap = allContainers.get(container.category);
                    if (!categoryMap) {
                        categoryMap = new Map();
                        allContainers.set(container.category, categoryMap);
                    }
                    categoryMap.set(container.type, container);
                });
                this.setState({credentialContainers: allContainers});
                console.log({allContainers});
            });
    }

    static credElementId(credType, credId, item) {
        return `${credType}-${item}-${credId.substring(0, 8)}`;
    }

    render() {
        return (<ContentPage_1.ContentPage title="signingIn" introMessage="signingInSubMessage">
            <react_core_1.Stack gutter='md'>
                {this.renderCategories()}
            </react_core_1.Stack>
        </ContentPage_1.ContentPage>);
    }

    renderCategories() {
        return (<> {Array.from(this.state.credentialContainers.keys()).map(category => (
            <react_core_1.StackItem key={category} isFilled>
                <react_core_1.Title id={`${category}-categ-title`} headingLevel={react_core_1.TitleLevel.h2} size='2xl'>
                    <strong><Msg_1.Msg msgKey={category}/></strong>
                </react_core_1.Title>
                <react_core_1.DataList aria-label='foo'>
                    {this.renderTypes(this.state.credentialContainers.get(category))}
                </react_core_1.DataList>
            </react_core_1.StackItem>))}</>);
    }

    renderTypes(credTypeMap) {
        return (<KeycloakContext_1.KeycloakContext.Consumer>
            {keycloak => (<>{Array.from(credTypeMap.keys()).map((credType, index, typeArray) => ([
                this.renderCredTypeTitle(credTypeMap.get(credType), keycloak),
                this.renderUserCredentials(credTypeMap, credType, keycloak),
                this.renderEmptyRow(credTypeMap.get(credType).type, index === typeArray.length - 1)
            ]))}</>)}
        </KeycloakContext_1.KeycloakContext.Consumer>);
    }

    renderEmptyRow(type, isLast) {
        if (isLast)
            return; // don't put empty row at the end
        return (<react_core_1.DataListItem aria-labelledby={'empty-list-item-' + type}>
            <react_core_1.DataListItemRow key={'empty-row-' + type}>
                <react_core_1.DataListItemCells
                    dataListCells={[<react_core_1.DataListCell></react_core_1.DataListCell>]}/>
            </react_core_1.DataListItemRow>
        </react_core_1.DataListItem>);
    }

    renderUserCredentials(credTypeMap, credType, keycloak) {
        const credContainer = credTypeMap.get(credType);
        const userCredentialMetadatas = credContainer.userCredentialMetadatas;
        const removeable = credContainer.removeable;
        const type = credContainer.type;
        const displayName = credContainer.displayName;
        if (!userCredentialMetadatas || userCredentialMetadatas.length === 0) {
            const localizedDisplayName = Msg_1.Msg.localize(displayName);
            return (
                <react_core_1.DataListItem key='no-credentials-list-item' aria-labelledby='no-credentials-list-item'>
                    <react_core_1.DataListItemRow key='no-credentials-list-item-row'>
                        <react_core_1.DataListItemCells dataListCells={[
                            <react_core_1.DataListCell key={'no-credentials-cell-0'}/>,
                            <strong id={`${type}-not-set-up`} key={'no-credentials-cell-1'}><Msg_1.Msg msgKey='notSetUp'
                                                                                                       params={[localizedDisplayName]}/></strong>,
                            <react_core_1.DataListCell key={'no-credentials-cell-2'}/>
                        ]}/>
                    </react_core_1.DataListItemRow>
                </react_core_1.DataListItem>);
        }
        userCredentialMetadatas.forEach(credentialMetadata => {
            let credential = credentialMetadata.credential;
            if (!credential.userLabel)
                credential.userLabel = Msg_1.Msg.localize(credential.type);
            if (credential.hasOwnProperty('createdDate') && credential.createdDate && credential.createdDate > 0) {
                credential.strCreatedDate = TimeUtil_1.default.format(credential.createdDate);
            }
        });
        let updateAIA;
        if (credContainer.updateAction) {
            updateAIA = new AIACommand_1.AIACommand(keycloak, credContainer.updateAction);
        }
        return (<React.Fragment key='userCredentialMetadatas'> {userCredentialMetadatas.map(credentialMetadata => (
            <react_core_1.DataListItem
                id={`${SigningInPage.credElementId(type, credentialMetadata.credential.id, 'row')}`}
                key={'credential-list-item-' + credentialMetadata.credential.id}
                aria-labelledby={'credential-list-item-' + credentialMetadata.credential.userLabel}>
                <react_core_1.DataListItemRow key={'userCredentialRow-' + credentialMetadata.credential.id}>
                    <react_core_1.DataListItemCells dataListCells={this.credentialRowCells(credentialMetadata, type)}/>
                    <CredentialAction credential={credentialMetadata.credential} removeable={removeable}
                                      updateAction={updateAIA} credRemover={this.handleRemove}/>
                </react_core_1.DataListItemRow>
            </react_core_1.DataListItem>))}
        </React.Fragment>);
    }

    credentialRowCells(credMetadata, type) {
        const credRowCells = [];
        const credential = credMetadata.credential;
        const infoMessage = credMetadata.infoMessage ? JSON.parse(credMetadata.infoMessage) : null;
        const warningMessageTitle = credMetadata.warningMessageTitle ? JSON.parse(credMetadata.warningMessageTitle) : null;
        const warningMessageDescription = credMetadata.warningMessageDescription ? JSON.parse(credMetadata.warningMessageDescription) : null;
        credRowCells.push(<react_core_1.DataListCell id={`${SigningInPage.credElementId(type, credential.id, 'label')}`}
                                                     key={'userLabel-' + credential.id}>
            {credential.userLabel}
            {infoMessage &&
                <div>{Msg_1.Msg.localize(infoMessage.key, infoMessage.parameters)}</div>}
            {warningMessageTitle &&
                <>
                    <br/>
                    <div className="pf-c-alert pf-m-warning pf-m-inline" aria-label="Success alert">
                        <div className="pf-c-alert__icon">
                            <i className="pficon-warning-triangle-o" aria-hidden="true"></i>
                        </div>
                        <h4 className="pf-c-alert__title">
                            <span className="pf-screen-reader">Warning alert:</span>
                            {Msg_1.Msg.localize(warningMessageTitle.key, warningMessageTitle.parameters)}
                        </h4>
                        {credMetadata.warningMessageDescription &&
                            <div className="pf-c-alert__description">
                                {Msg_1.Msg.localize(warningMessageDescription.key, warningMessageDescription.parameters)}
                            </div>}
                    </div>
                </>}
        </react_core_1.DataListCell>);
        if (credential.strCreatedDate) {
            credRowCells.push(<react_core_1.DataListCell
                id={`${SigningInPage.credElementId(type, credential.id, 'created-at')}`}
                key={'created-' + credential.id}><strong><Msg_1.Msg msgKey='credentialCreatedAt'/>:
            </strong>{credential.strCreatedDate}</react_core_1.DataListCell>);
            credRowCells.push(<react_core_1.DataListCell key={'spacer-' + credential.id}/>);
        }
        return credRowCells;
    }

    renderCredTypeTitle(credContainer, keycloak) {
        if (!credContainer.hasOwnProperty('helptext') && !credContainer.hasOwnProperty('createAction'))
            return;
        let setupAction;
        if (credContainer.createAction) {
            setupAction = new AIACommand_1.AIACommand(keycloak, credContainer.createAction);
        }
        const credContainerDisplayName = Msg_1.Msg.localize(credContainer.displayName);
        return (<React.Fragment key={'credTypeTitle-' + credContainer.type}>
            <react_core_1.DataListItem aria-labelledby={'type-datalistitem-' + credContainer.type}>
                <react_core_1.DataListItemRow key={'credTitleRow-' + credContainer.type}>
                    <react_core_1.DataListItemCells dataListCells={[
                        <react_core_1.DataListCell width={5} key={'credTypeTitle-' + credContainer.type}>
                            <react_core_1.Title headingLevel={react_core_1.TitleLevel.h3} size='2xl'>
                                <strong id={`${credContainer.type}-cred-title`}><Msg_1.Msg
                                    msgKey={credContainer.displayName}/></strong>
                            </react_core_1.Title>
                            <span id={`${credContainer.type}-cred-help`}>
                                        {credContainer.helptext && <Msg_1.Msg msgKey={credContainer.helptext}/>}
                                    </span>
                        </react_core_1.DataListCell>,
                    ]}/>
                    {credContainer.createAction &&
                        <react_core_1.DataListAction aria-labelledby='create' aria-label='create action'
                                                     id={'mob-setUpAction-' + credContainer.type}
                                                     className={react_core_1.DataListActionVisibility.hiddenOnLg}>
                            <react_core_1.Dropdown isPlain position={react_core_1.DropdownPosition.right}
                                                   toggle={<react_core_1.KebabToggle onToggle={isOpen => {
                                                       credContainer.open = isOpen;
                                                       this.setState({credentialContainers: new Map(this.state.credentialContainers)});
                                                   }}/>} isOpen={credContainer.open} dropdownItems={[
                                <button id={`mob-${credContainer.type}-set-up`} className="pf-c-button pf-m-link"
                                        type="button" onClick={() => setupAction.execute()}>
                                        <span className="pf-c-button__icon">
                                            <i className="fas fa-plus-circle" aria-hidden="true"></i>
                                        </span>
                                    <Msg_1.Msg msgKey='setUpNew' params={[credContainerDisplayName]}/>
                                </button>
                            ]}/>
                        </react_core_1.DataListAction>}
                    {credContainer.createAction &&
                        <react_core_1.DataListAction aria-labelledby='create' aria-label='create action'
                                                     id={'setUpAction-' + credContainer.type}
                                                     className={react_styles_1.css(react_core_1.DataListActionVisibility.visibleOnLg, react_core_1.DataListActionVisibility.hidden)}>
                            <button id={`${credContainer.type}-set-up`} className="pf-c-button pf-m-link" type="button"
                                    onClick={() => setupAction.execute()}>
                                <span className="pf-c-button__icon">
                                    <i className="fas fa-plus-circle" aria-hidden="true"></i>
                                </span>
                                <Msg_1.Msg msgKey='setUpNew' params={[credContainerDisplayName]}/>
                            </button>
                        </react_core_1.DataListAction>}
                </react_core_1.DataListItemRow>
            </react_core_1.DataListItem>
        </React.Fragment>);
    }
}

SigningInPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
;

class CredentialAction extends React.Component {
    render() {
        if (this.props.updateAction) {
            return (<react_core_1.DataListAction aria-labelledby='foo' aria-label='foo action'
                                                 id={'updateAction-' + this.props.credential.id}>
                <react_core_1.Button
                    id={`${SigningInPage.credElementId(this.props.credential.type, this.props.credential.id, 'update')}`}
                    variant='primary' onClick={() => this.props.updateAction.execute()}><Msg_1.Msg msgKey='update'/>
                </react_core_1.Button>
            </react_core_1.DataListAction>);
        }
        if (this.props.removeable) {
            const userLabel = this.props.credential.userLabel;
            return (<react_core_1.DataListAction aria-labelledby='foo' aria-label='foo action'
                                                 id={'removeAction-' + this.props.credential.id}>
                <ContinueCancelModal_1.ContinueCancelModal buttonTitle='remove'
                                                           buttonId={`${SigningInPage.credElementId(this.props.credential.type, this.props.credential.id, 'remove')}`}
                                                           modalTitle={Msg_1.Msg.localize('removeCred', [userLabel])}
                                                           modalMessage={Msg_1.Msg.localize('stopUsingCred', [userLabel])}
                                                           onContinue={() => this.props.credRemover(this.props.credential.id, userLabel)}/>
            </react_core_1.DataListAction>);
        }
        return (<></>);
    }
}

const SigningInPageWithRouter = react_router_dom_1.withRouter(SigningInPage);
exports.SigningInPage = SigningInPageWithRouter;
//# sourceMappingURL=SigningInPage.jsx.map