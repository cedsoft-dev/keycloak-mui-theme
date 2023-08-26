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
const ContentPages_1 = require("./ContentPages");

class PageNavigation extends React.Component {
    constructor(props) {
        super(props);
    }

    findActiveItem() {
        const currentPath = this.props.location.pathname;
        const items = ContentPages_1.flattenContent(content);
        const firstItem = items[0];
        for (let item of items) {
            const itemPath = '/' + item.path;
            if (itemPath === currentPath) {
                return item;
            }
        }
        ;
        return firstItem;
    }

    render() {
        const activeItem = this.findActiveItem();
        return (<react_core_1.Nav>
            <react_core_1.NavList>
                {ContentPages_1.makeNavItems(activeItem)}
            </react_core_1.NavList>
        </react_core_1.Nav>);
    }
}

exports.PageNav = react_router_dom_1.withRouter(PageNavigation);
//# sourceMappingURL=PageNav.jsx.map