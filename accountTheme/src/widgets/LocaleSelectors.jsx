"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
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
const React = require("react");
const react_core_1 = require("@patternfly/react-core");
const Msg_1 = require("./Msg");
;

class LocaleSelector extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<react_core_1.FormSelect id="locale-select" value={this.props.value} onChange={(value, event) => {
            if (this.props.onChange)
                this.props.onChange(value, event);
        }} aria-label={Msg_1.Msg.localize('selectLocale')}>
            {availableLocales.map((locale, index) => <react_core_1.FormSelectOption key={index} value={locale.locale}
                                                                                    label={locale.label}/>)}
        </react_core_1.FormSelect>);
    }
}

exports.LocaleSelector = LocaleSelector;
//# sourceMappingURL=LocaleSelectors.jsx.map