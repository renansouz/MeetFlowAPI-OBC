import { adaptRoute } from "@/application/adapters";
import { makeLoginController,makeSignupController } from "@/slices/user/controllers";

export const signupAdapter = () => adaptRoute(makeSignupController());
export const loginAdapter = () => adaptRoute(makeLoginController());