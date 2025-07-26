import { permissions } from "./strings";

export const restrictions: Record<string, string[]> = {
    hr: [permissions.USER_CREATION,permissions.SUPER_ACTIVE],
    admin: [], 
  }