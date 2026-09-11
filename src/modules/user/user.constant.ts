import { registerEnumType } from "@nestjs/graphql";

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER", 
};


export const STATUS = {
  Active: "Active",
  Suspended: "Suspended",
} as const;

registerEnumType(USER_ROLE, { name: "USER_ROLE" });
registerEnumType(STATUS, { name: "STATUS" });
