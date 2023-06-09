import { api } from "./api";

export function forgotPassword(email: string) {
  return api.post("/password/forgot", { email });
}
