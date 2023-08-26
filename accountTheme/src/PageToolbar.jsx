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
const ReferrerDropdownItem_1 = require("./widgets/ReferrerDropdownItem");
const ReferrerLink_1 = require("./widgets/ReferrerLink");
const Logout_1 = require("./widgets/Logout");

class PageToolbar extends React.Component {
    constructor(props) {
        super(props);
        this.hasReferrer = typeof referrerName !== 'undefined';
        this.onKebabDropdownToggle = (isKebabDropdownOpen) => {
            this.setState({
                isKebabDropdownOpen
            });
        };
        this.state = {
            isKebabDropdownOpen: false,
        };
    }

    render() {
        const kebabDropdownItems = [];
        if (this.hasReferrer) {
            kebabDropdownItems.push(<ReferrerDropdownItem_1.ReferrerDropdownItem key='referrerDropdownItem'/>);
        }
        kebabDropdownItems.push(<Logout_1.LogoutDropdownItem key='LogoutDropdownItem'/>);
        return (<react_core_1.Toolbar>
            {this.hasReferrer &&
                <react_core_1.ToolbarGroup key='referrerGroup'>
                    <react_core_1.ToolbarItem className="pf-m-icons" key='referrer'>
                        <ReferrerLink_1.ReferrerLink/>
                    </react_core_1.ToolbarItem>
                </react_core_1.ToolbarGroup>}

            <react_core_1.ToolbarGroup key='secondGroup'>
                <react_core_1.ToolbarItem className="pf-m-icons" key='logout'>
                    <Logout_1.LogoutButton/>
                </react_core_1.ToolbarItem>

                <react_core_1.ToolbarItem key='kebab' className="pf-m-mobile">
                    <react_core_1.Dropdown isPlain position="right" toggle={<react_core_1.KebabToggle id="mobileKebab"
                                                                                                      onToggle={this.onKebabDropdownToggle}/>}
                                           isOpen={this.state.isKebabDropdownOpen} dropdownItems={kebabDropdownItems}/>
                </react_core_1.ToolbarItem>
            </react_core_1.ToolbarGroup>
        </react_core_1.Toolbar>);
    }
}

exports.PageToolbar = PageToolbar;
//# sourceMappingURL=PageToolbar.jsx.map