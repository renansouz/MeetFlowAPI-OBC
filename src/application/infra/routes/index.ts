import { account } from "./account";
import { appointment } from "./appointment";
import { auth } from "./auth";
import { client } from "./client";
import { order } from "./order";
import {request} from "./request";
import { schedule } from "./schedule";
import { service } from "./service";
import { user, userProfessionalByPage } from "./user";
// IMPORT MODULE FILES

const routes = [
  user,
  userProfessionalByPage,
  auth,
  account,
  service,
  schedule,
  appointment,
  request,
  client,
  order,
  // ADD FUNCTION IMPORTS
];

export { routes };