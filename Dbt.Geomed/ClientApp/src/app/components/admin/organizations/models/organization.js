"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Organization = /** @class */ (function () {
    function Organization(id, name) {
        this._id = id;
        this._name = name;
    }
    Object.defineProperty(Organization.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    return Organization;
}());
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map