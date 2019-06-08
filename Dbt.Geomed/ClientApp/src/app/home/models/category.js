"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Category = /** @class */ (function () {
    function Category(id, name) {
        this._id = id;
        this._name = name;
        this._services = [];
    }
    Object.defineProperty(Category.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Category.prototype, "services", {
        get: function () { return this._services; },
        set: function (value) { this._services = value; },
        enumerable: true,
        configurable: true
    });
    return Category;
}());
exports.Category = Category;
//# sourceMappingURL=category.js.map