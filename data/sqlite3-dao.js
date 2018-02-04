"use strict"

import { TodoDao } from "./sqlite3-todo-dao";
import { UserDao } from "./sqlite3-user-dao";
const jwt = require('jsonwebtoken');

export function Status(status, message) {
  this.status = status;
  this.message = message;
}

export { TodoDao, UserDao };

export function getIdFromToken(token) {
  console.log("sqlite3-dao:token: " + token);
  const payload = jwt.decode(token);
  if (payload.data && payload.data.id) {
    const { id } = payload.data;
    console.log("sqlite3-dao:id: " + id);
    return id;
  }
  else {
    console.error("sqlite3-dao:payload: " + payload + " does not have a data.id field");
    return -1;
  }
}
