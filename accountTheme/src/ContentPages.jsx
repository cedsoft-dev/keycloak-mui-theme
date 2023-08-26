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
const Msg_1 = require("./widgets/Msg");
const PageNotFound_1 = require("./content/page-not-found/PageNotFound");
const ForbiddenPage_1 = require("./content/forbidden-page/ForbiddenPage");
;

function isModulePageDef(item) {
    return item.modulePath !== undefined;
}

exports.isModulePageDef = isModulePageDef;

function isExpansion(contentItem) {
    return contentItem.content !== undefined;
}

exports.isExpansion = isExpansion;

function groupId(group) {
    return 'grp-' + group;
}

function itemId(group, item) {
    return 'grp-' + group + '_itm-' + item;
}

function isChildOf(parent, child) {
    for (var item of parent.content) {
        if (isExpansion(item) && isChildOf(item, child))
            return true;
        if (parent.groupId === child.groupId)
            return true;
    }
    return false;
}

function createNavItems(activePage, contentParam, groupNum) {
    if (typeof content === 'undefined')
        return (<React.Fragment/>);
    const links = contentParam.map((item) => {
        const navLinkId = `nav-link-${item.id}`;
        if (isExpansion(item)) {
            return <react_core_1.NavExpandable id={navLinkId} groupId={item.groupId} key={item.groupId}
                                               title={Msg_1.Msg.localize(item.label, item.labelParams)}
                                               isExpanded={isChildOf(item, activePage)}>
                {createNavItems(activePage, item.content, groupNum + 1)}
            </react_core_1.NavExpandable>;
        } else {
            const page = item;
            return <react_core_1.NavItem id={navLinkId} groupId={item.groupId} itemId={item.itemId} key={item.itemId}
                                         to={'#/' + page.path} isActive={activePage.itemId === item.itemId}
                                         type="button">
                {Msg_1.Msg.localize(page.label, page.labelParams)}
            </react_core_1.NavItem>;
        }
    });
    return (<React.Fragment>{links}</React.Fragment>);
}

function makeNavItems(activePage) {
    console.log({activePage});
    return createNavItems(activePage, content, 0);
}

exports.makeNavItems = makeNavItems;

function setIds(contentParam, groupNum) {
    if (typeof contentParam === 'undefined')
        return groupNum;
    let expansionGroupNum = groupNum;
    for (let i = 0; i < contentParam.length; i++) {
        const item = contentParam[i];
        if (isExpansion(item)) {
            item.itemId = itemId(groupNum, i);
            expansionGroupNum = expansionGroupNum + 1;
            item.groupId = groupId(expansionGroupNum);
            expansionGroupNum = setIds(item.content, expansionGroupNum);
            console.log('currentGroup=' + (expansionGroupNum));
        } else {
            item.groupId = groupId(groupNum);
            item.itemId = itemId(groupNum, i);
        }
    }
    ;
    return expansionGroupNum;
}

function initGroupAndItemIds() {
    setIds(content, 0);
    console.log({content});
}

exports.initGroupAndItemIds = initGroupAndItemIds;

// get rid of Expansions and put all PageDef items into a single array
function flattenContent(pageDefs) {
    const flat = [];
    for (let item of pageDefs) {
        if (isExpansion(item)) {
            flat.push(...flattenContent(item.content));
        } else {
            flat.push(item);
        }
    }
    return flat;
}

exports.flattenContent = flattenContent;

function makeRoutes() {
    if (typeof content === 'undefined')
        return (<span/>);
    const pageDefs = flattenContent(content);
    const routes = pageDefs.map((page) => {
        if (isModulePageDef(page)) {
            const node = React.createElement(page.module[page.componentName], {'pageDef': page});
            return <react_router_dom_1.Route key={page.itemId} path={'/' + page.path} exact render={() => node}/>;
        } else {
            const pageDef = page;
            return <react_router_dom_1.Route key={page.itemId} path={'/' + page.path} exact
                                             component={pageDef.component}/>;
        }
    });
    return (<react_router_dom_1.Switch>
        {routes}
        <react_router_dom_1.Route path="/forbidden" component={ForbiddenPage_1.ForbiddenPage}/>
        <react_router_dom_1.Route component={PageNotFound_1.PageNotFound}/>
    </react_router_dom_1.Switch>);
}

exports.makeRoutes = makeRoutes;
//# sourceMappingURL=ContentPages.jsx.map