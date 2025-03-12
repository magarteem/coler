import { DefaultSession } from "next-auth";
import { UserType } from "./profileType";

declare module "next-auth" {
  interface Session extends UserType {
    accessToken?: string;
  }
}
