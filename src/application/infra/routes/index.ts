import { account } from "./account";
import { auth } from "./auth";
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
  // ADD FUNCTION IMPORTS
];

export { routes };