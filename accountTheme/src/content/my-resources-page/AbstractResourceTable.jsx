"use strict";
Object.defineProperty(exports, "__esModule", {value: true});
const React = require("react");
const Msg_1 = require("../../widgets/Msg");

class AbstractResourcesTable extends React.Component {
    hasPermissions(row) {
        return (this.state.permissions.has(row)) && (this.state.permissions.get(row).length > 0);
    }

    firstUser(row) {
        if (!this.hasPermissions(row))
            return 'ERROR!!!!'; // should never happen
        return this.state.permissions.get(row)[0].username;
    }

    numOthers(row) {
        if (!this.hasPermissions(row))
            return -1; // should never happen
        return this.state.permissions.get(row).length - 1;
    }

    sharedWithUsersMessage(row) {
        if (!this.hasPermissions(row))
            return (<React.Fragment><Msg_1.Msg msgKey='resourceNotShared'/></React.Fragment>);
        return (<React.Fragment>
            <Msg_1.Msg msgKey='resourceSharedWith'>
                <strong>{this.firstUser(row)}</strong>
            </Msg_1.Msg>
            {this.numOthers(row) > 0 && <Msg_1.Msg msgKey='and'>
                <strong>{this.numOthers(row)}</strong>
            </Msg_1.Msg>}.
        </React.Fragment>);
    }

    getClientName(client) {
        if (client.hasOwnProperty('name') && client.name !== null && client.name !== '') {
            return Msg_1.Msg.localize(client.name);
        } else {
            return client.clientId;
        }
    }
}

exports.AbstractResourcesTable = AbstractResourcesTable;
//# sourceMappingURL=AbstractResourceTable.jsx.map