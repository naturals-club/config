import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  users: new CRUD("users"),
  diets: new CRUD("diets"),
  chats: Chat,
}
