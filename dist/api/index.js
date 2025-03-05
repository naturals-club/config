"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const crud_1 = require("./crud");
const chats_1 = require("./chats");
exports.api = {
    users: new crud_1.CRUD("users"),
    diets: new crud_1.CRUD("diets"),
    chats: chats_1.Chat,
};
