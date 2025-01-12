import {
  faCalendarDays,
  faHandsHoldingChild,
  faMessage,
  faPersonBooth,
  faSchoolFlag,
  faTableColumns,
  faUserPlus,
  faWandMagicSparkles,
  faCalendarDay,
  faCommentDollar,
  faEnvelope,
  faClipboard,
  faFileImport,
  faBriefcase,
  faFaceGrinHearts,
} from "@fortawesome/free-solid-svg-icons";

export const APP_URL = [
  "/login",
  "/app/dash",
  "/app/addschool",
  "/app/schools",
  "/app/view-edit-school",
  "/app/view-edit-class",
  "/app/view-edit-staff",
  "/app/class",
  "/app/addclass",
  "/app/staff",
  "/app/addstaff",
  "/app/students",
  "/app/addStudent",
  "/app/view-edit-student",
  "/app/studentFee",
  "/app/year",
  "/app/studentReport",
  "/app/newReport",
  "/app/fees",
  "/app/addfees",
  "/app/schoolHolidays",
  "/app/addHoliday",
];

export const BLOODGROUP = [
  { option: "A+", value: "A+" },
  { option: "A-", value: "A-" },
  { option: "B+", value: "B+" },
  { option: "B-", value: "B-" },
  { option: "O+", value: "O+" },
  { option: "O-", value: "O-" },
  { option: "AB+", value: "AB+" },
  { option: "AB-", value: "AB-" },
];

export const LATE_FEE = 100;

export const CASH_PAID_BY = [
  { option: "UPA", value: "UPA" },
  { option: "Net Banking", value: "Net Banking" },
  { option: "Cash", value: "Cash" },
];

export const RELATIONSHIP = [
  { option: "Mother", value: "Mother" },
  { option: "Father", value: "Father" },
  { option: "Guardian", value: "Guardian" },
];

export const TERMS = [
  { option: "TERM-I", value: "TERM-I" },
  { option: "TERM-II", value: "TERM-II" },
];
export const CLASS_IDENTITY = [
  { option: "Junior KG", value: "JR_KG" },
  { option: "Senior KG", value: "SR_KG" },
  { option: "Nursary", value: "NURSERY" },
  { option: "Play Group", value: "PLAY_GROUP" },
  { option: "First Standard", value: "FIRST_STANDARD" },
];

export const ROLE_STUDENT = "STUDENT";
export const ROLE_HELPER = "HELPER";
export const ROLE_SUPER_ADMIN = "SUPER_ADMIN";
export const ROLE_ADMIN = "ADMIN";
export const ROLE_ASSISTANCE = "ASSISTANCE";
export const ROLE_OTHER = "OTHER";
export const ROLE_TEACHER = "TEACHER";
export const ROLE_PARENT = "PARENT";
export const ROLE_PRINCIPAL = "PRINCIPAL";

export const ADMIN_MENU = [
  { name: "School Years", path: "/app/year", icon: faCalendarDay },
  { name: "Fees", path: "/app/fees", icon: faCommentDollar },
  {
    name: "School Holidays",
    path: "/app/schoolHolidays",
    icon: faFaceGrinHearts,
  },
  { name: "Emails", path: "/app/students", icon: faEnvelope },
  { name: "Exam Time Table", path: "/app/staff", icon: faClipboard },
  { name: "Planner", path: "/app/class", icon: faCalendarDay },
  { name: "Syllabus", path: "/", icon: faFileImport },
  { name: "Worksheet", path: "/", icon: faBriefcase },
];

export const SUPER_ADMIN_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: faTableColumns },
  { name: "School", path: "/app/schools", icon: faSchoolFlag },
  { name: "Student", path: "/app/students", icon: faHandsHoldingChild },
  { name: "Staff", path: "/app/staff", icon: faUserPlus },
  { name: "Class", path: "/app/class", icon: faPersonBooth },
  { name: "Message", path: "/", icon: faMessage },
  { name: "Calendar", path: "/", icon: faCalendarDays },
  {
    name: "Admin Tool",
    path: "/",
    icon: faWandMagicSparkles,
    child: ADMIN_MENU,
  },
];
export const ADMIN_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: faTableColumns },
  { name: "Add Student", path: "/", icon: "fa-children" },
  { name: "Add Staff", path: "/", icon: "fa-tachometer-alt" },
  { name: "Add Class", path: "/", icon: "fa-tachometer-alt" },
  { name: "Message", path: "/", icon: "fa-tachometer-alt" },
  { name: "Calendar", path: "/", icon: "fa-calendar" },
];
export const ASSISTANCE_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
  { name: "Add Student", path: "" },
  { name: "Add Staff", path: "" },
  { name: "Add Class", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];
export const PARENT_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
  { name: "Students", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];
export const HELPER_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "", icon: "fa-calendar" },
];

export const TEACHER_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
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

export const RAHATANI_BRANCH = "Rahatani Phata, Kalewadi";
export const HINJEWADI_BRANCH = "Maan, Hinjewadi";

const sampleBody = {
  id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  title: "string",
  remark: "string",
  otherInfo: "string",
  teacherComments: "string",
  terms: "string",
  promoted: "string",
  studentYears: {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  },
  reportQueAnswerKgs: [
    {
      answer: "string",
      answerNumber: 0,
      reportCard: "string",
      reportQuestions: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
    },
  ],
  reportQueAnswerPlay: [
    {
      needImprovement: "string",
      satisfactory: "string",
      good: "string",
      excellent: "string",
      grade: "string",
      reportQuestions: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
    },
  ],
  reportQueAnswerFirst: [
    {
      reportCard: "string",
      augMarkScheduled: "string",
      augTeacherComments: "string",
      halfMarkScheduled: "string",
      halfTeacherComments: "string",
      decTeacherComments: "string",
      decMarkScheduled: "string",
      finalTeacherComments: "string",
      finalMarkScheduled: "string",
      reportQuestions: {
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      },
    },
  ],
  published: true,
};
