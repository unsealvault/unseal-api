import { registerEnumType } from "@nestjs/graphql";

export const USER_ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
  INSTRUCTOR: "INSTRUCTOR",
  DIRECTOR: "DIRECTOR",
};

export const STATUS = {
  Active: "Active",
  Blocked: "Blocked",
} as const;

registerEnumType(USER_ROLE, { name: "USER_ROLE" });
registerEnumType(STATUS, { name: "STATUS" });
