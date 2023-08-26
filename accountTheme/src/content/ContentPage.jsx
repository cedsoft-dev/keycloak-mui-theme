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
const react_icons_1 = require("@patternfly/react-icons");
const Msg_1 = require("../widgets/Msg");
const ContentAlert_1 = require("./ContentAlert");

/**
 * @author Stan Silvert ssilvert@redhat.com (C) 2019 Red Hat Inc.
 */
class ContentPage extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<React.Fragment>
            <ContentAlert_1.ContentAlert/>
            <section id="page-heading" className="pf-c-page__main-section pf-m-light">
                <react_core_1.Grid>
                    <react_core_1.GridItem span={11}>
                        <react_core_1.Title headingLevel='h1' size='3xl'><strong><Msg_1.Msg msgKey={this.props.title}/></strong>
                        </react_core_1.Title>
                    </react_core_1.GridItem>
                    {this.props.onRefresh &&
                        <react_core_1.GridItem span={1}>
                            <react_core_1.Tooltip content={<Msg_1.Msg msgKey='refreshPage'/>}>
                                <react_core_1.Button aria-describedby="refresh page" id='refresh-page' variant='plain'
                                                     onClick={this.props.onRefresh}>
                                    <react_icons_1.RedoIcon size='sm'/>
                                </react_core_1.Button>
                            </react_core_1.Tooltip>
                        </react_core_1.GridItem>}
                    {this.props.introMessage &&
                        <react_core_1.GridItem span={12}><Msg_1.Msg msgKey={this.props.introMessage}/>
                        </react_core_1.GridItem>}
                </react_core_1.Grid>
            </section>

            <section className="pf-c-page__main-section pf-m-no-padding-mobile">
                {this.props.children}
            </section>
        </React.Fragment>);
    }
}

exports.ContentPage = ContentPage;
;
//# sourceMappingURL=ContentPage.jsx.map