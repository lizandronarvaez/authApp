import { User } from "./user.interface";

export interface LoginResponse {
  message:    string;
  statusCode: number;
  token:      string;
  user:       User;
}

