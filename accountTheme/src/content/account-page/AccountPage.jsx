"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
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
const React = require("react");
const react_core_1 = require("@patternfly/react-core");
const AccountServiceContext_1 = require("../../account-service/AccountServiceContext");
const Msg_1 = require("../../widgets/Msg");
const ContentPage_1 = require("../ContentPage");
const ContentAlert_1 = require("../ContentAlert");
const LocaleSelectors_1 = require("../../widgets/LocaleSelectors");
const KeycloakContext_1 = require("../../keycloak-service/KeycloakContext");
const AIACommand_1 = require("../../util/AIACommand");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
class AccountPage extends React.Component {
    constructor(props, context) {
        super(props);
        this.isRegistrationEmailAsUsername = features.isRegistrationEmailAsUsername;
        this.isEditUserNameAllowed = features.isEditUserNameAllowed;
        this.isDeleteAccountAllowed = features.deleteAccountAllowed;
        this.DEFAULT_STATE = {
            errors: {
                username: '',
                firstName: '',
                lastName: '',
                email: ''
            },
            formFields: {
                username: '',
                firstName: '',
                lastName: '',
                email: '',
                attributes: {}
            }
        };
        this.state = this.DEFAULT_STATE;
        this.handleCancel = () => {
            this.fetchPersonalInfo();
        };
        this.handleChange = (value, event) => {
            const target = event.currentTarget;
            const name = target.name;
            this.setState({
                errors: {...this.state.errors, [name]: target.validationMessage},
                formFields: {...this.state.formFields, [name]: value}
            });
        };
        this.handleSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const isValid = form.checkValidity();
            if (isValid) {
                const reqData = {...this.state.formFields};
                this.context.doPost("/", reqData)
                    .then(() => {
                        ContentAlert_1.ContentAlert.success('accountUpdatedMessage');
                        if (locale !== this.state.formFields.attributes.locale[0]) {
                            window.location.reload();
                        }
                    });
            } else {
                const formData = new FormData(form);
                const validationMessages = Array.from(formData.keys()).reduce((acc, key) => {
                    acc[key] = form.elements[key].validationMessage;
                    return acc;
                }, {});
                this.setState({
                    errors: {...validationMessages},
                    formFields: this.state.formFields
                });
            }
        };
        this.handleDelete = (keycloak) => {
            new AIACommand_1.AIACommand(keycloak, "delete_account").execute();
        };
        this.UsernameInput = () => (
            <react_core_1.TextInput isRequired type="text" id="user-name" name="username" maxLength={254}
                                    value={this.state.formFields.username} onChange={this.handleChange}
                                    isValid={this.state.errors.username === ''}>
            </react_core_1.TextInput>);
        this.RestrictedUsernameInput = () => (
            <react_core_1.TextInput isDisabled type="text" id="user-name" name="username"
                                    value={this.state.formFields.username}>
            </react_core_1.TextInput>);
        this.context = context;
        this.fetchPersonalInfo();
    }

    fetchPersonalInfo() {
        this.context.doGet("/")
            .then((response) => {
                this.setState(this.DEFAULT_STATE);
                const formFields = response.data;
                if (!formFields.attributes) {
                    formFields.attributes = {locale: [locale]};
                } else if (!formFields.attributes.locale) {
                    formFields.attributes.locale = [locale];
                }
                this.setState({...{formFields: formFields}});
            });
    }

    render() {
        const fields = this.state.formFields;
        return (<ContentPage_1.ContentPage title="personalInfoHtmlTitle" introMessage="personalSubMessage">
            <react_core_1.Form isHorizontal onSubmit={event => this.handleSubmit(event)}>
                {!this.isRegistrationEmailAsUsername &&
                    <react_core_1.FormGroup label={Msg_1.Msg.localize('username')} isRequired fieldId="user-name"
                                            helperTextInvalid={this.state.errors.username}
                                            isValid={this.state.errors.username === ''}>
                        {this.isEditUserNameAllowed && <this.UsernameInput/>}
                        {!this.isEditUserNameAllowed && <this.RestrictedUsernameInput/>}
                    </react_core_1.FormGroup>}
                <react_core_1.FormGroup label={Msg_1.Msg.localize('email')} isRequired fieldId="email-address"
                                        helperTextInvalid={this.state.errors.email}
                                        isValid={this.state.errors.email === ''}>
                    <react_core_1.TextInput isRequired type="email" id="email-address" name="email" maxLength={254}
                                            value={fields.email} onChange={this.handleChange}
                                            isValid={this.state.errors.email === ''}>
                    </react_core_1.TextInput>
                </react_core_1.FormGroup>
                <react_core_1.FormGroup label={Msg_1.Msg.localize('firstName')} isRequired fieldId="first-name"
                                        helperTextInvalid={this.state.errors.firstName}
                                        isValid={this.state.errors.firstName === ''}>
                    <react_core_1.TextInput isRequired type="text" id="first-name" name="firstName" maxLength={254}
                                            value={fields.firstName} onChange={this.handleChange}
                                            isValid={this.state.errors.firstName === ''}>
                    </react_core_1.TextInput>
                </react_core_1.FormGroup>
                <react_core_1.FormGroup label={Msg_1.Msg.localize('lastName')} isRequired fieldId="last-name"
                                        helperTextInvalid={this.state.errors.lastName}
                                        isValid={this.state.errors.lastName === ''}>
                    <react_core_1.TextInput isRequired type="text" id="last-name" name="lastName" maxLength={254}
                                            value={fields.lastName} onChange={this.handleChange}
                                            isValid={this.state.errors.lastName === ''}>
                    </react_core_1.TextInput>
                </react_core_1.FormGroup>
                {features.isInternationalizationEnabled &&
                    <react_core_1.FormGroup label={Msg_1.Msg.localize('selectLocale')} isRequired fieldId="locale">
                        <LocaleSelectors_1.LocaleSelector id="locale-selector" value={fields.attributes.locale || ''}
                                                          onChange={value => this.setState({
                                                              errors: this.state.errors,
                                                              formFields: {...this.state.formFields,
                                                                  attributes: {
                                                                      ...this.state.formFields.attributes,
                                                                      locale: [value]
                                                                  }
                                                              }
                                                          })}/>
                    </react_core_1.FormGroup>}
                <react_core_1.ActionGroup>
                    <react_core_1.Button type="submit" id="save-btn" variant="primary"
                                         isDisabled={Object.values(this.state.errors).filter(e => e !== '').length !== 0}>
                        <Msg_1.Msg msgKey="doSave"/>
                    </react_core_1.Button>
                    <react_core_1.Button id="cancel-btn" variant="secondary" onClick={this.handleCancel}>
                        <Msg_1.Msg msgKey="doCancel"/>
                    </react_core_1.Button>
                </react_core_1.ActionGroup>
            </react_core_1.Form>

            {this.isDeleteAccountAllowed &&
                <div id="delete-account" style={{marginTop: "30px"}}>
                    <react_core_1.Expandable toggleText={Msg_1.Msg.localize('deleteAccount')}>
                        <react_core_1.Grid gutter={"sm"}>
                            <react_core_1.GridItem span={6}>
                                <p>
                                    <Msg_1.Msg msgKey="deleteAccountWarning"/>
                                </p>
                            </react_core_1.GridItem>
                            <react_core_1.GridItem span={4}>
                                <KeycloakContext_1.KeycloakContext.Consumer>
                                    {(keycloak) => (<react_core_1.Button id="delete-account-btn" variant="danger"
                                                                         onClick={() => this.handleDelete(keycloak)}
                                                                         className="delete-button"><Msg_1.Msg
                                        msgKey="doDelete"/></react_core_1.Button>)}
                                </KeycloakContext_1.KeycloakContext.Consumer>
                            </react_core_1.GridItem>
                            <react_core_1.GridItem span={2}>
                            </react_core_1.GridItem>
                        </react_core_1.Grid>

                    </react_core_1.Expandable>
                </div>}
        </ContentPage_1.ContentPage>);
    }
}

exports.AccountPage = AccountPage;
AccountPage.contextType = AccountServiceContext_1.AccountServiceContext;
;
//# sourceMappingURL=AccountPage.jsx.map