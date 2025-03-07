"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const crud_1 = require("./crud");
const chats_1 = require("./chats");
exports.api = {
    students: new crud_1.CRUD("students"),
    contacts: new crud_1.CRUD("contacts"),
    users: new crud_1.CRUD("users"),
    plans: new crud_1.CRUD("plans"),
    chats: chats_1.Chat,
};
