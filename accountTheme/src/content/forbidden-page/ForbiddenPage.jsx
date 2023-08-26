"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
/*
 * Copyright 2020 Red Hat, Inc. and/or its affiliates.
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
const react_icons_1 = require("@patternfly/react-icons");
const Msg_1 = require("../../widgets/Msg");
const EmptyMessageState_1 = require("../../widgets/EmptyMessageState");

class ForbiddenPage extends React.Component {
    constructor() {
        super({});
    }

    render() {
        return (<EmptyMessageState_1.default icon={react_icons_1.WarningTriangleIcon} messageKey="forbidden">
            <Msg_1.Msg msgKey="needAccessRights"/>
        </EmptyMessageState_1.default>);
    }
}

exports.ForbiddenPage = ForbiddenPage;
;
//# sourceMappingURL=ForbiddenPage.jsx.map