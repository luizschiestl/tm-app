import { api } from "./api";

export function resetPassword(token: string, password: string) {
  return api.post("/password/reset", { token, password });
}
