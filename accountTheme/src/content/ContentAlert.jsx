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
const Msg_1 = require("../widgets/Msg");

class ContentAlert extends React.Component {
    constructor(props) {
        super(props);
        this.hideAlert = (key) => {
            this.setState({alerts: [...this.state.alerts.filter(el => el.key !== key)]});
        };
        this.getUniqueId = () => (new Date().getTime());
        this.postAlert = (variant, message, params) => {
            const alerts = this.state.alerts;
            const key = this.getUniqueId();
            alerts.push({
                key,
                message: Msg_1.Msg.localize(message, params),
                variant
            });
            this.setState({alerts});
            if (variant !== react_core_1.AlertVariant.danger) {
                setTimeout(() => this.hideAlert(key), 8000);
            }
        };
        this.state = {
            alerts: []
        };
        ContentAlert.instance = this;
    }

    /**
     * @param message A literal text message or localization key.
     */
    static success(message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.success, message, params);
    }

    /**
     * @param message A literal text message or localization key.
     */
    static danger(message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.danger, message, params);
    }

    /**
     * @param message A literal text message or localization key.
     */
    static warning(message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.warning, message, params);
    }

    /**
     * @param message A literal text message or localization key.
     */
    static info(message, params) {
        ContentAlert.instance.postAlert(react_core_1.AlertVariant.info, message, params);
    }

    render() {
        return (<react_core_1.AlertGroup isToast aria-live="assertive">
            {this.state.alerts.map(({key, variant, message}) => (
                <react_core_1.Alert aria-details={message} isLiveRegion variant={variant} title={message}
                                    action={<react_core_1.AlertActionCloseButton title={message}
                                                                                 variantLabel={`${variant} alert`}
                                                                                 onClose={() => this.hideAlert(key)}/>}
                                    key={key}/>))}
        </react_core_1.AlertGroup>);
    }
}

exports.ContentAlert = ContentAlert;
//# sourceMappingURL=ContentAlert.jsx.map