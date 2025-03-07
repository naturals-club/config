import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  students: new CRUD("students"),
  contacts: new CRUD("contacts"),
  users: new CRUD("users"),
  plans: new CRUD("plans"),
  chats: Chat,
}
