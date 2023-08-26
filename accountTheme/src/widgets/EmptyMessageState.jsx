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
const Msg_1 = require("./Msg");

class EmptyMessageState extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<react_core_1.EmptyState variant={react_core_1.EmptyStateVariant.full}>
            <react_core_1.EmptyStateIcon icon={this.props.icon}/>
            <react_core_1.Title headingLevel={react_core_1.TitleLevel.h5} size="lg">
                <Msg_1.Msg msgKey={this.props.messageKey}/>
            </react_core_1.Title>
            <react_core_1.EmptyStateBody>
                {this.props.children}
            </react_core_1.EmptyStateBody>
        </react_core_1.EmptyState>);
    }
}

exports.default = EmptyMessageState;
//# sourceMappingURL=EmptyMessageState.jsx.map