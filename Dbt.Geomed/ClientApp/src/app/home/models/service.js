"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Service = /** @class */ (function () {
    function Service(id, name, categoryId) {
        this._id = id;
        this._name = name;
        this._categoryId = categoryId;
    }
    Object.defineProperty(Service.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Service.prototype, "categoryId", {
        get: function () { return this._categoryId; },
        enumerable: true,
        configurable: true
    });
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=service.js.map