"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API = void 0;
const crud_1 = require("./crud");
const chat_1 = require("./chat");
exports.API = {
    user: new crud_1.CRUD("user"),
    diet: new crud_1.CRUD("diet"),
    chat: chat_1.Chat,
};
