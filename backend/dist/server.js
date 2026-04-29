"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const init_1 = require("./db/init");
const config_1 = require("./config");
(async () => {
    await (0, init_1.initDb)();
    app_1.default.listen(config_1.config.port, () => {
        console.log(`Server running on ${config_1.config.port}`);
    });
})();
