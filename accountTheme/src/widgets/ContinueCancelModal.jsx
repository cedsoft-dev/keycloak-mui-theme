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
const Msg_1 = require("./Msg");

/**
 * This class renders a button that provides a continue/cancel modal dialog when clicked.  If the user selects 'Continue'
 * then the onContinue function is executed.
 *
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
class ContinueCancelModal extends React.Component {
    constructor(props) {
        super(props);
        this.handleModalToggle = () => {
            this.setState(({isModalOpen}) => ({
                isModalOpen: !isModalOpen
            }));
            if (this.props.onClose)
                this.props.onClose();
        };
        this.handleContinue = () => {
            this.handleModalToggle();
            this.props.onContinue();
        };
        this.state = {
            isModalOpen: false
        };
    }

    render() {
        const {isModalOpen} = this.state;
        return (<React.Fragment>
            {!this.props.render &&
                <react_core_1.Button id={this.props.buttonId} variant={this.props.buttonVariant}
                                     onClick={this.handleModalToggle} isDisabled={this.props.isDisabled}>
                    <Msg_1.Msg msgKey={this.props.buttonTitle}/>
                </react_core_1.Button>}
            {this.props.render && this.props.render(this.handleModalToggle)}
            <react_core_1.Modal {...this.props} title={Msg_1.Msg.localize(this.props.modalTitle)} isOpen={isModalOpen}
                                onClose={this.handleModalToggle} actions={[
                <react_core_1.Button id='modal-cancel' key="cancel" variant="secondary"
                                     onClick={this.handleModalToggle}>
                    <Msg_1.Msg msgKey={this.props.modalCancelButtonLabel}/>
                </react_core_1.Button>,
                <react_core_1.Button id='modal-confirm' key="confirm" variant="primary" onClick={this.handleContinue}>
                    <Msg_1.Msg msgKey={this.props.modalContinueButtonLabel}/>
                </react_core_1.Button>
            ]}>
                {!this.props.modalMessage && this.props.children}
                {this.props.modalMessage && <Msg_1.Msg msgKey={this.props.modalMessage}/>}
            </react_core_1.Modal>
        </React.Fragment>);
    }
}

exports.ContinueCancelModal = ContinueCancelModal;
ContinueCancelModal.defaultProps = {
    buttonVariant: 'primary',
    modalContinueButtonLabel: 'continue',
    modalCancelButtonLabel: 'doCancel',
    isDisabled: false,
    isSmall: true
};
;
//# sourceMappingURL=ContinueCancelModal.jsx.map