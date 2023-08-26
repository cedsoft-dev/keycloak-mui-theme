"use strict";
Object.defineProperty(exports, "__esModule", {value: true});

class Scope {
    constructor(name, displayName) {
        this.name = name;
        this.displayName = displayName;
    }

    toString() {
        if (this.hasOwnProperty('displayName') && (this.displayName)) {
            return this.displayName;
        } else {
            return this.name;
        }
    }
}

exports.Scope = Scope;
//# sourceMappingURL=resource-model.js.map