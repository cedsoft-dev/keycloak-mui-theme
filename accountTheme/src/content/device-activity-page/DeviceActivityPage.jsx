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
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const TimeUtil_1 = require("../../util/TimeUtil");
const react_core_1 = require("@patternfly/react-core");
const react_icons_1 = require("@patternfly/react-icons");
const Msg_1 = require("../../widgets/Msg");
const ContinueCancelModal_1 = require("../../widgets/ContinueCancelModal");
const KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
const ContentPage_1 = require("../ContentPage");
const ContentAlert_1 = require("../ContentAlert");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
class DeviceActivityPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.signOutAll = (keycloakService) => {
            this.context.doDelete("/sessions")
                .then(() => {
                    keycloakService.logout();
                });
        };
        this.signOutSession = (device, session) => {
            this.context.doDelete("/sessions/" + session.id)
                .then(() => {
                    this.fetchDevices();
                    ContentAlert_1.ContentAlert.success('signedOutSession', [session.browser, device.os]);
                });
        };
        this.context = context;
        this.state = {
            devices: []
        };
        this.fetchDevices();
    }

    fetchDevices() {
        this.context.doGet("/sessions/devices")
            .then((response) => {
                console.log({response});
                let devices = this.moveCurrentToTop(response.data);
                this.setState({
                    devices: devices
                });
            });
    }

    // current device and session should display at the top of their respective lists
    moveCurrentToTop(devices) {
        let currentDevice = devices[0];
        devices.forEach((device, index) => {
            if (device.current) {
                currentDevice = device;
                devices.splice(index, 1);
                devices.unshift(device);
            }
        });
        currentDevice.sessions.forEach((session, index) => {
            if (session.current) {
                const currentSession = currentDevice.sessions.splice(index, 1);
                currentDevice.sessions.unshift(currentSession[0]);
            }
        });
        return devices;
    }

    time(time) {
        return TimeUtil_1.default.format(time * 1000);
    }

    elementId(item, session) {
        return `session-${session.id.substring(0, 7)}-${item}`;
    }

    findBrowserIcon(session) {
        const browserName = session.browser.toLowerCase();
        if (browserName.includes("chrom"))
            return (<react_icons_1.ChromeIcon id={this.elementId('icon-chrome', session)} size='lg'/>); // chrome or chromium
        if (browserName.includes("firefox"))
            return (<react_icons_1.FirefoxIcon id={this.elementId('icon-firefox', session)} size='lg'/>);
        if (browserName.includes("edge"))
            return (<react_icons_1.EdgeIcon id={this.elementId('icon-edge', session)} size='lg'/>);
        if (browserName.startsWith("ie/"))
            return (<react_icons_1.InternetExplorerIcon id={this.elementId('icon-ie', session)} size='lg'/>);
        if (browserName.includes("safari"))
            return (<react_icons_1.SafariIcon id={this.elementId('icon-safari', session)} size='lg'/>);
        if (browserName.includes("opera"))
            return (<react_icons_1.OperaIcon id={this.elementId('icon-opera', session)} size='lg'/>);
        if (browserName.includes("yandex"))
            return (<react_icons_1.YandexInternationalIcon id={this.elementId('icon-yandex', session)} size='lg'/>);
        if (browserName.includes("amazon"))
            return (<react_icons_1.AmazonIcon id={this.elementId('icon-amazon', session)} size='lg'/>);
        return (<react_icons_1.GlobeIcon id={this.elementId('icon-default', session)} size='lg'/>);
    }

    findOS(device) {
        if (device.os.toLowerCase().includes('unknown'))
            return Msg_1.Msg.localize('unknownOperatingSystem');
        return device.os;
    }

    findOSVersion(device) {
        if (device.osVersion.toLowerCase().includes('unknown'))
            return '';
        return device.osVersion;
    }

    makeClientsString(clients) {
        let clientsString = "";
        clients.forEach((client, index) => {
            let clientName;
            if (client.hasOwnProperty('clientName') && (client.clientName !== undefined) && (client.clientName !== '')) {
                clientName = Msg_1.Msg.localize(client.clientName);
            } else {
                clientName = client.clientId;
            }
            clientsString += clientName;
            if (clients.length > index + 1)
                clientsString += ', ';
        });
        return clientsString;
    }

    isShowSignOutAll(devices) {
        if (devices.length === 0)
            return false;
        if (devices.length > 1)
            return true;
        if (devices[0].sessions.length > 1)
            return true;
        return false;
    }

    render() {
        return (<ContentPage_1.ContentPage title="device-activity" onRefresh={this.fetchDevices.bind(this)}>
            <react_core_1.Stack gutter="md">
                <react_core_1.StackItem isFilled>
                    <react_core_1.DataList aria-label={Msg_1.Msg.localize('signedInDevices')}>
                        <react_core_1.DataListItem key="SignedInDevicesHeader" aria-labelledby="signedInDevicesTitle"
                                                   isExpanded={false}>
                            <react_core_1.DataListItemRow>
                                <react_core_1.DataListItemCells dataListCells={[
                                    <react_core_1.DataListCell key='signedInDevicesTitle' width={4}>
                                        <div id="signedInDevicesTitle" className="pf-c-content">
                                            <h2><Msg_1.Msg msgKey="signedInDevices"/></h2>
                                            <p>
                                                <Msg_1.Msg msgKey="signedInDevicesExplanation"/>
                                            </p>
                                        </div>
                                    </react_core_1.DataListCell>,
                                    <KeycloakContext_1.KeycloakContext.Consumer>
                                        {(keycloak) => (<react_core_1.DataListCell key='signOutAllButton' width={1}>
                                            {this.isShowSignOutAll(this.state.devices) &&
                                                <ContinueCancelModal_1.ContinueCancelModal
                                                    buttonTitle='signOutAllDevices' buttonId='sign-out-all'
                                                    modalTitle='signOutAllDevices'
                                                    modalMessage='signOutAllDevicesWarning'
                                                    onContinue={() => this.signOutAll(keycloak)}/>}
                                        </react_core_1.DataListCell>)}
                                    </KeycloakContext_1.KeycloakContext.Consumer>
                                ]}/>
                            </react_core_1.DataListItemRow>
                        </react_core_1.DataListItem>

                        <react_core_1.DataListItem aria-labelledby='sessions'>
                            <react_core_1.DataListItemRow>
                                <react_core_1.Grid gutter='sm'>
                                    <react_core_1.GridItem span={12}/>
                                    {this.state.devices.map((device, deviceIndex) => {
                                        return (<React.Fragment>
                                            {device.sessions.map((session, sessionIndex) => {
                                                return (<React.Fragment
                                                    key={'device-' + deviceIndex + '-session-' + sessionIndex}>

                                                    <react_core_1.GridItem md={3}>
                                                        <react_core_1.Stack>
                                                            <react_core_1.StackItem isFilled={false}>
                                                                <react_core_1.Bullseye>{this.findBrowserIcon(session)}</react_core_1.Bullseye>
                                                            </react_core_1.StackItem>
                                                            <react_core_1.StackItem isFilled={false}>
                                                                <react_core_1.Bullseye
                                                                    id={this.elementId('ip', session)}>{session.ipAddress}</react_core_1.Bullseye>
                                                            </react_core_1.StackItem>
                                                            {session.current &&
                                                                <react_core_1.StackItem isFilled={false}>
                                                                    <react_core_1.Bullseye
                                                                        id={this.elementId('current-badge', session)}>
                                                                        <strong
                                                                            className='pf-c-badge pf-m-read'><Msg_1.Msg
                                                                            msgKey="currentSession"/></strong>
                                                                    </react_core_1.Bullseye>
                                                                </react_core_1.StackItem>}
                                                        </react_core_1.Stack>
                                                    </react_core_1.GridItem>
                                                    <react_core_1.GridItem md={9}>
                                                        {!session.browser.toLowerCase().includes('unknown') &&
                                                            <p id={this.elementId('browser', session)}>
                                                                <strong>{session.browser} / {this.findOS(device)} {this.findOSVersion(device)}</strong>
                                                            </p>}
                                                        <p id={this.elementId('last-access', session)}>
                                                            <strong>{Msg_1.Msg.localize('lastAccessedOn')}</strong> {this.time(session.lastAccess)}
                                                        </p>
                                                        <p id={this.elementId('clients', session)}>
                                                            <strong>{Msg_1.Msg.localize('clients')}</strong> {this.makeClientsString(session.clients)}
                                                        </p>
                                                        <p id={this.elementId('started', session)}>
                                                            <strong>{Msg_1.Msg.localize('startedAt')}</strong> {this.time(session.started)}
                                                        </p>
                                                        <p id={this.elementId('expires', session)}>
                                                            <strong>{Msg_1.Msg.localize('expiresAt')}</strong> {this.time(session.expires)}
                                                        </p>
                                                        {!session.current &&
                                                            <ContinueCancelModal_1.ContinueCancelModal
                                                                buttonTitle='doSignOut'
                                                                buttonId={this.elementId('sign-out', session)}
                                                                modalTitle='doSignOut' buttonVariant='secondary'
                                                                modalMessage='signOutWarning'
                                                                onContinue={() => this.signOutSession(device, session)}/>}

                                                    </react_core_1.GridItem>
                                                </React.Fragment>);
                                            })}
                                        </React.Fragment>);
                                    })}
                                    <react_core_1.GridItem span={12}/>
                                </react_core_1.Grid>
                            </react_core_1.DataListItemRow>
                        </react_core_1.DataListItem>
                    </react_core_1.DataList>
                </react_core_1.StackItem>

            </react_core_1.Stack>
        </ContentPage_1.ContentPage>);
    }
}

exports.DeviceActivityPage = DeviceActivityPage;
DeviceActivityPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
//# sourceMappingURL=DeviceActivityPage.jsx.map