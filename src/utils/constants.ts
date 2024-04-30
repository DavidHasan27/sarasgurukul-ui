import {
  faCalendarDays,
  faHandsHoldingChild,
  faMessage,
  faPersonBooth,
  faSchoolFlag,
  faTableColumns,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export const APP_URL = ["/login", "/dash"];

export const ROLE_STUDENT = "STUDENT";
export const ROLE_HELPER = "HELPER";
export const ROLE_SUPER_ADMIN = "SUPER_ADMIN";
export const ROLE_ADMIN = "ADMIN";
export const ROLE_ASSISTANCE = "ASSISTANCE";
export const ROLE_OTHER = "OTHER";
export const ROLE_TEACHER = "TEACHER";
export const ROLE_PARENT = "PARENT";
export const ROLE_PRINCIPAL = "PRINCIPAL";

export const SUPER_ADMIN_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: faTableColumns },
  { name: "Add Student", path: "/", icon: faHandsHoldingChild },
  { name: "Add Staff", path: "/", icon: faUserPlus },
  { name: "Add Class", path: "/", icon: faPersonBooth },
  { name: "Add School Branch", path: "/", icon: faSchoolFlag },
  { name: "Message", path: "/", icon: faMessage },
  { name: "Calendar", path: "/", icon: faCalendarDays },
];
export const ADMIN_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: faTableColumns },
  { name: "Add Student", path: "/", icon: "fa-children" },
  { name: "Add Staff", path: "/", icon: "fa-tachometer-alt" },
  { name: "Add Class", path: "/", icon: "fa-tachometer-alt" },
  { name: "Message", path: "/", icon: "fa-tachometer-alt" },
  { name: "Calendar", path: "/", icon: "fa-calendar" },
];
export const ASSISTANCE_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: "fa-tachometer-alt" },
  { name: "Add Student", path: "" },
  { name: "Add Staff", path: "" },
  { name: "Add Class", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];
export const PARENT_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: "fa-tachometer-alt" },
  { name: "Students", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];
export const HELPER_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: "fa-tachometer-alt" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];

export const TEACHER_MENU_LIST = [
  { name: "Dashboard", path: "/", icon: "fa-tachometer-alt" },
  { name: "Add Student", path: "" },
  { name: "Add Staff", path: "" },
  { name: "Add Class", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];

export const MENU_LIST: any = {
  [ROLE_SUPER_ADMIN]: SUPER_ADMIN_MENU_LIST,
  [ROLE_TEACHER]: TEACHER_MENU_LIST,
  [ROLE_ADMIN]: ADMIN_MENU_LIST,
  [ROLE_PARENT]: PARENT_MENU_LIST,
  [ROLE_ASSISTANCE]: PARENT_MENU_LIST,
  default: [],
};
