"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var AccountDashboardGuard = /** @class */ (function () {
    function AccountDashboardGuard() {
    }
    AccountDashboardGuard.prototype.canActivate = function (route, state) {
        return confirm('Вы уверены, что хотите перейти?');
    };
    return AccountDashboardGuard;
}());
exports.AccountDashboardGuard = AccountDashboardGuard;
//# sourceMappingURL=account-dashboard.guard.js.map