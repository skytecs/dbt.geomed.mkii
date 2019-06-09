"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/** Организация, предоставляющая указанные услуги */
var SuggestedOrganization = /** @class */ (function () {
    function SuggestedOrganization(id, name, address, distance) {
        this._id = id;
        this._name = name;
        this._address = address;
        this._distance = distance;
    }
    Object.defineProperty(SuggestedOrganization.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "address", {
        get: function () { return this._address; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "distance", {
        get: function () { return this._distance; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "services", {
        get: function () { return this._services; },
        set: function (value) {
            this._services = value;
            this._total = value
                .filter(function (x) { return !x.oms; })
                .map(function (x) { return x.price || 0; })
                .reduce(function (x, y) { return x + y; }, 0);
            this._oms = value.every(function (x) { return x.oms; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "displayedDistance", {
        get: function () {
            if (!this._distance) {
                return "N/A";
            }
            if (this._distance < 1000) {
                return ">1км";
            }
            var rounded = Math.round(this._distance / 1000);
            return rounded + "\u043A\u043C";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "displayedPrice", {
        get: function () {
            if (this._oms) {
                return "по ОМС";
            }
            if (this._total === 0) {
                return "бесплатно";
            }
            return this._total + "\u20BD";
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "close", {
        get: function () { return this._distance < 5000; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "total", {
        get: function () { return this._total; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "length", {
        get: function () { return this._services.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedOrganization.prototype, "totalFor", {
        get: function () {
            var p = this._services.length % 10;
            switch (p) {
                case 1:
                    return "\u0437\u0430 " + this.length + " \u0443\u0441\u043B\u0443\u0433\u0443";
                case 2:
                case 3:
                case 4:
                    return "\u0437\u0430 " + this.length + " \u0443\u0441\u043B\u0443\u0433\u0438";
                default:
                    return "\u0437\u0430 " + this.length + " \u0443\u0441\u043B\u0443\u0433";
            }
        },
        enumerable: true,
        configurable: true
    });
    return SuggestedOrganization;
}());
exports.SuggestedOrganization = SuggestedOrganization;
//# sourceMappingURL=suggested-organization.js.map