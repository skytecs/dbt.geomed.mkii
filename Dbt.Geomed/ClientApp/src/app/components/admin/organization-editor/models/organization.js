"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Organization = /** @class */ (function () {
    function Organization(id) {
        this._id = id;
    }
    Object.defineProperty(Organization.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "name", {
        get: function () { return this._name; },
        set: function (value) { this._name = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "lat", {
        get: function () { return this._lat; },
        set: function (value) { this._lat = value; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Organization.prototype, "lgt", {
        get: function () { return this._lon; },
        set: function (value) { this._lon = value; },
        enumerable: true,
        configurable: true
    });
    return Organization;
}());
exports.Organization = Organization;
//# sourceMappingURL=organization.js.map