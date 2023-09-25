import { registerAs } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

import { UserEntity } from "src/user/entity/user.entity";

export default registerAs(
  "orm.config",
  (): TypeOrmModuleOptions => ({
    type: "postgres",
    host: "hendersontestdevdb.cluster-cqcvjq64ncab.ap-south-1.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "gKz2U5kdZYYg7STQJq4v",
    database: "hendersontestdevdb",
    entities: [UserEntity],
    synchronize: false,
    schema: "util",
  })
);
