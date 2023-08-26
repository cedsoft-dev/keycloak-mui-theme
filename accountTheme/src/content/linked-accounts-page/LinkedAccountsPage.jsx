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
const react_core_1 = require("@patternfly/react-core");
const react_icons_1 = require("@patternfly/react-icons");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const Msg_1 = require("../../widgets/Msg");
const ContentPage_1 = require("../ContentPage");
const RedirectUri_1 = require("../../util/RedirectUri");

/**
 * @author Stan Silvert
 */
class LinkedAccountsPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.context = context;
        this.state = {
            linkedAccounts: [],
            unLinkedAccounts: []
        };
        this.getLinkedAccounts();
    }

    getLinkedAccounts() {
        this.context.doGet("/linked-accounts")
            .then((response) => {
                console.log({response});
                const linkedAccounts = response.data.filter((account) => account.connected);
                const unLinkedAccounts = response.data.filter((account) => !account.connected);
                this.setState({linkedAccounts: linkedAccounts, unLinkedAccounts: unLinkedAccounts});
            });
    }

    unLinkAccount(account) {
        const url = '/linked-accounts/' + account.providerName;
        this.context.doDelete(url)
            .then((response) => {
                console.log({response});
                this.getLinkedAccounts();
            });
    }

    linkAccount(account) {
        const url = '/linked-accounts/' + account.providerName;
        const redirectUri = RedirectUri_1.createRedirect(this.props.location.pathname);
        this.context.doGet(url, {params: {providerId: account.providerName, redirectUri}})
            .then((response) => {
                console.log({response});
                window.location.href = response.data.accountLinkUri;
            });
    }

    render() {
        return (<ContentPage_1.ContentPage title={Msg_1.Msg.localize('linkedAccountsTitle')}
                                           introMessage={Msg_1.Msg.localize('linkedAccountsIntroMessage')}>
            <react_core_1.Stack gutter='md'>
                <react_core_1.StackItem isFilled>
                    <react_core_1.Title headingLevel={react_core_1.TitleLevel.h2} size='2xl'>
                        <Msg_1.Msg msgKey='linkedLoginProviders'/>
                    </react_core_1.Title>
                    <react_core_1.DataList id="linked-idps" aria-label='foo'>
                        {this.makeRows(this.state.linkedAccounts, true)}
                    </react_core_1.DataList>
                </react_core_1.StackItem>
                <react_core_1.StackItem isFilled/>
                <react_core_1.StackItem isFilled>
                    <react_core_1.Title headingLevel={react_core_1.TitleLevel.h2} size='2xl'>
                        <Msg_1.Msg msgKey='unlinkedLoginProviders'/>
                    </react_core_1.Title>
                    <react_core_1.DataList id="unlinked-idps" aria-label='foo'>
                        {this.makeRows(this.state.unLinkedAccounts, false)}
                    </react_core_1.DataList>
                </react_core_1.StackItem>
            </react_core_1.Stack>
        </ContentPage_1.ContentPage>);
    }

    emptyRow(isLinked) {
        let isEmptyMessage = '';
        if (isLinked) {
            isEmptyMessage = Msg_1.Msg.localize('linkedEmpty');
        } else {
            isEmptyMessage = Msg_1.Msg.localize('unlinkedEmpty');
        }
        return (<react_core_1.DataListItem key='emptyItem' aria-labelledby="empty-item">
            <react_core_1.DataListItemRow key='emptyRow'>
                <react_core_1.DataListItemCells dataListCells={[
                    <react_core_1.DataListCell key='empty'><strong>{isEmptyMessage}</strong></react_core_1.DataListCell>
                ]}/>
            </react_core_1.DataListItemRow>
        </react_core_1.DataListItem>);
    }

    makeRows(accounts, isLinked) {
        if (accounts.length === 0) {
            return this.emptyRow(isLinked);
        }
        return (<> {accounts.map((account) => (
            <react_core_1.DataListItem id={`${account.providerAlias}-idp`} key={account.providerName}
                                       aria-labelledby="simple-item1">
                <react_core_1.DataListItemRow key={account.providerName}>
                    <react_core_1.DataListItemCells dataListCells={[
                        <react_core_1.DataListCell key='idp'>
                            <react_core_1.Stack>
                                <react_core_1.StackItem isFilled>{this.findIcon(account)}</react_core_1.StackItem>
                                <react_core_1.StackItem id={`${account.providerAlias}-idp-name`} isFilled><h2>
                                    <strong>{account.displayName}</strong></h2></react_core_1.StackItem>
                            </react_core_1.Stack>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='badge'>
                            <react_core_1.Stack>
                                <react_core_1.StackItem isFilled/>
                                <react_core_1.StackItem id={`${account.providerAlias}-idp-badge`}
                                                        isFilled>{this.badge(account)}</react_core_1.StackItem>
                            </react_core_1.Stack>
                        </react_core_1.DataListCell>,
                        <react_core_1.DataListCell key='username'>
                            <react_core_1.Stack>
                                <react_core_1.StackItem isFilled/>
                                <react_core_1.StackItem id={`${account.providerAlias}-idp-username`}
                                                        isFilled>{account.linkedUsername}</react_core_1.StackItem>
                            </react_core_1.Stack>
                        </react_core_1.DataListCell>,
                    ]}/>
                    <react_core_1.DataListAction aria-labelledby='foo' aria-label='foo action' id='setPasswordAction'>
                        {isLinked && <react_core_1.Button id={`${account.providerAlias}-idp-unlink`} variant='link'
                                                          onClick={() => this.unLinkAccount(account)}>
                            <react_icons_1.UnlinkIcon size='sm'/>
                            <Msg_1.Msg msgKey='unLink'/></react_core_1.Button>}
                        {!isLinked && <react_core_1.Button id={`${account.providerAlias}-idp-link`} variant='link'
                                                           onClick={() => this.linkAccount(account)}>
                            <react_icons_1.LinkIcon size='sm'/>
                            <Msg_1.Msg msgKey='link'/></react_core_1.Button>}
                    </react_core_1.DataListAction>
                </react_core_1.DataListItemRow>
            </react_core_1.DataListItem>))} </>);
    }

    badge(account) {
        if (account.social) {
            return (<react_core_1.Badge><Msg_1.Msg msgKey='socialLogin'/></react_core_1.Badge>);
        }
        return (<react_core_1.Badge style={{backgroundColor: "green"}}><Msg_1.Msg msgKey='systemDefined'/>
        </react_core_1.Badge>);
    }

    findIcon(account) {
        const socialIconId = `${account.providerAlias}-idp-icon-social`;
        if (account.providerName.toLowerCase().includes('github'))
            return (<react_icons_1.GithubIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('linkedin'))
            return (<react_icons_1.LinkedinIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('facebook'))
            return (<react_icons_1.FacebookIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('google'))
            return (<react_icons_1.GoogleIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('instagram'))
            return (<react_icons_1.InstagramIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('microsoft'))
            return (<react_icons_1.MicrosoftIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('bitbucket'))
            return (<react_icons_1.BitbucketIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('twitter'))
            return (<react_icons_1.TwitterIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('openshift'))
            return (<react_icons_1.OpenshiftIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('gitlab'))
            return (<react_icons_1.GitlabIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('paypal'))
            return (<react_icons_1.PaypalIcon id={socialIconId} size='xl'/>);
        if (account.providerName.toLowerCase().includes('stackoverflow'))
            return (<react_icons_1.StackOverflowIcon id={socialIconId} size='xl'/>);
        return (<react_icons_1.CubeIcon id={`${account.providerAlias}-idp-icon-default`} size='xl'/>);
    }
}

LinkedAccountsPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
const LinkedAccountsPagewithRouter = react_router_dom_1.withRouter(LinkedAccountsPage);
exports.LinkedAccountsPage = LinkedAccountsPagewithRouter;
//# sourceMappingURL=LinkedAccountsPage.jsx.map