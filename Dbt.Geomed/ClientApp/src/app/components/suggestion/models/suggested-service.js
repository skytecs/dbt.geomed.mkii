"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SuggestedService = /** @class */ (function () {
    function SuggestedService(id, name, price, oms, organizationId) {
        this._id = id;
        this._name = name;
        this._price = price;
        this._oms = oms;
        this._organizationId = organizationId;
    }
    Object.defineProperty(SuggestedService.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedService.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedService.prototype, "price", {
        get: function () { return this._price; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedService.prototype, "oms", {
        get: function () { return this._oms; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedService.prototype, "organizationId", {
        get: function () { return this._organizationId; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SuggestedService.prototype, "displayedPrice", {
        get: function () {
            if (this._oms) {
                return "по ОМС";
            }
            if (!this._price) {
                return "бесплатно";
            }
            return this._price + "\u20BD";
        },
        enumerable: true,
        configurable: true
    });
    return SuggestedService;
}());
exports.SuggestedService = SuggestedService;
//# sourceMappingURL=suggested-service.js.map