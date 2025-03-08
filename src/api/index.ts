import { client } from "./client";
import { CRUD } from "./crud";
import { Chat } from "./chats";

export const api = {
  paymentMethods: new CRUD("payment-methods"),
  students: new CRUD("students"),
  contacts: new CRUD("contacts"),
  users: new CRUD("users"),
  plans: new CRUD("plans"),
  chats: Chat,

  setup: {
    setAuthorization: (token: string) => {
      client.setHeaders({ Authorization: `Bearer ${token}` });
    }
  }
}
