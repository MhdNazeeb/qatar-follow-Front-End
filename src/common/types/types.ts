export interface JobData {
  jobTitle: string;
  companyName: string;
  jobType: string;
  jobDescription: string;
  email: string;
  websiteLink: string;
  experience: string;
  expirationDate: string;
  image: any;
  jobsStatus?: boolean;
  location?: string
  _id?: string
  super_active: boolean
  role?: string;
};

// Define a type for the sidebar item
export type SidebarItem = {
  name: string;
  router: string;
  index: number;
  icon?: string; 
};

export type modalType = {
  JOB_ACTIVE: "job_active",
  SUPER_ACTIVE: "super_active",
  INTITLS: ""
}

// Define an object conforming to modalType
export type Permissions = {
  USER_CREATION: "USERCREATION",
  SUPER_ACTIVE: "SUPER_ACTIVE",
}
export type userRoles = {
  ADMIN: "ADMIN",
  HR: "HR",
  USER: "USER",
};


export type Input = {
  name: string;
  label: string;
  type: string;
};