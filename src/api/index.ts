import { CRUD } from "./crud";
import { Chat } from "./chat";

export const API = {
  user: new CRUD("user"),
  diet: new CRUD("diet"),
  chat: Chat,
}
