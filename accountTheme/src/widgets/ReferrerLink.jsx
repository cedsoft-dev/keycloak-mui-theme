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
const Msg_1 = require("./Msg");
const react_icons_1 = require("@patternfly/react-icons");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2018 Red Hat Inc.
 */
class ReferrerLink extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            // '_hash_' is a workaround for when uri encoding is not
            // sufficient to escape the # character properly.
            // See AppInitiatedActionPage for more details.
            <a id="referrerLink" href={referrerUri.replace('_hash_', '#')}>
                <react_icons_1.ArrowIcon/>
                <Msg_1.Msg msgKey="backTo" params={[referrerName]}/>
            </a>);
    }
}

exports.ReferrerLink = ReferrerLink;
;
//# sourceMappingURL=ReferrerLink.jsx.map