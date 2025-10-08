import {  Input, modalType, Permissions, userRoles } from "./types"



  
  export const permissions: Permissions = {
    USER_CREATION: "USERCREATION",
    SUPER_ACTIVE: "SUPER_ACTIVE",  
  }

  export const modalTypes: modalType = {
    JOB_ACTIVE: "job_active",
    SUPER_ACTIVE: "super_active",
    INTITLS:""  // must match exactly
  }
  
export const userRols:userRoles = {
  ADMIN: "ADMIN",
  HR: "HR",
  USER:"USER",
};
export const fields: Input[] = [
  { label: "Full Name", name: "fullName", type: "text" },
  { label: "Email", name: "email", type: "email" },
  { label: "Phone Number", name: "phone", type: "tel" },
];

