"use strict";
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
Object.defineProperty(exports, "__esModule", {value: true});
const React = require("react");
const react_icons_1 = require("@patternfly/react-icons");
const react_router_dom_1 = require("react-router-dom");
const Msg_1 = require("../../widgets/Msg");
const EmptyMessageState_1 = require("../../widgets/EmptyMessageState");

class PgNotFound extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<EmptyMessageState_1.default icon={react_icons_1.WarningTriangleIcon} messageKey="pageNotFound">
            <Msg_1.Msg msgKey="invalidRoute" params={[this.props.location.pathname]}/>
        </EmptyMessageState_1.default>);
    }
}
;
exports.PageNotFound = react_router_dom_1.withRouter(PgNotFound);
//# sourceMappingURL=PageNotFound.jsx.map