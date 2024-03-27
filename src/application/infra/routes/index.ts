import { account } from "./account";
import { appointment } from "./appointment";
import { auth } from "./auth";
import {request} from "./request";
import { schedule } from "./schedule";
import { service } from "./service";
import { user } from "./user";
// IMPORT MODULE FILES

const routes = [
  user,
  auth,
  account,
  service,
  schedule,
  appointment,
  // ADD FUNCTION IMPORTS
];

export { routes };