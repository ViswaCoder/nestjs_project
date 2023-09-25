"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("@nestjs/config");
const user_entity_1 = require("../user/entity/user.entity");
exports.default = (0, config_1.registerAs)("orm.config", () => ({
    type: "postgres",
    host: "hendersontestdevdb.cluster-cqcvjq64ncab.ap-south-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "gKz2U5kdZYYg7STQJq4v",
    database: "hendersontestdevdb",
    entities: [user_entity_1.UserEntity],
    synchronize: false,
    schema: "util",
}));
//# sourceMappingURL=orm.config.js.map