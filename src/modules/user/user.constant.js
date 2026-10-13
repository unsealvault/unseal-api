"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS = exports.USER_ROLE = void 0;
const graphql_1 = require("@nestjs/graphql");
exports.USER_ROLE = {
    ADMIN: "ADMIN",
    USER: "USER",
};
exports.STATUS = {
    Active: "Active",
    Suspended: "Suspended",
};
(0, graphql_1.registerEnumType)(exports.USER_ROLE, { name: "USER_ROLE" });
(0, graphql_1.registerEnumType)(exports.STATUS, { name: "STATUS" });
//# sourceMappingURL=user.constant.js.map