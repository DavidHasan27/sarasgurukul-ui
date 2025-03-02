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
  faImagePortrait,
  faPhotoFilm,
  faIdCard,
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
  "/app/worksheets",
  "/app/addWorksheets",
  "/app/galleryview",
  "/app/addImages",
  "/app/planner",
  "/app/addPlans",
  "/app/messages",
  "/app/newmessages",
  "/app/contact",
  "/app/calendar",
  "/app/exam",
  "/app/profile",
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
// export const SERVER_URL = "https://api.sarasgurukul.com";
export const SERVER_URL = "http://localhost:8080";

export const LATE_FEE = 100;

export const CASH_PAID_BY = [
  { option: "UPA", value: "UPA" },
  { option: "Net Banking", value: "Net Banking" },
  { option: "Cash", value: "Cash" },
];

export const MESSAGE_TYPE = [
  { option: "Notice", value: "NOTICE" },
  { option: "Notification", value: "NOTIFICATION" },
  // { option: "WhatsApp", value: "WHATSAPP" },
  { option: "Email", value: "EMAIL" },
];

export const MESSAGE_TYPE_PARENT = [{ option: "Email", value: "EMAIL" }];
export const MESSAGE_TYPE_WITH_ALL = [
  { option: "Notice", value: "NOTICE" },
  { option: "Notification", value: "NOTIFICATION" },
  // { option: "WhatsApp", value: "WHATSAPP" },
  { option: "Email", value: "EMAIL" },
  { option: "All", value: "" },
];

export const RELATIONSHIP = [
  { option: "Mother", value: "Mother" },
  { option: "Father", value: "Father" },
  { option: "Guardian", value: "Guardian" },
];

export const IMAGE_TAG: any = [
  { option: "All", value: "All" },
  { option: "Playing", value: "Playing" },
  { option: "Drawing", value: "Drawing" },
  { option: "Reading", value: "Reading" },
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
  // { name: "Messages", path: "/app/messages", icon: faEnvelope },
  { name: "Exam Time Table", path: "/app/exam", icon: faClipboard },
  { name: "Planner", path: "/app/planner", icon: faCalendarDay },
  { name: "Worksheet", path: "/app/worksheets", icon: faBriefcase },
  { name: "Gallery", path: "/app/galleryview", icon: faPhotoFilm },
  { name: "Contact Us", path: "/app/contact", icon: faIdCard },
];

export const TEACHER_ADMIN_TOOLS = [
  {
    name: "School Holidays",
    path: "/app/schoolHolidays",
    icon: faFaceGrinHearts,
  },
  // { name: "Messages", path: "/app/messages", icon: faEnvelope },
  { name: "Exam Time Table", path: "/app/exam", icon: faClipboard },
  { name: "Planner", path: "/app/planner", icon: faCalendarDay },
  { name: "Worksheet", path: "/app/worksheets", icon: faBriefcase },
];

export const SUPER_ADMIN_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: faTableColumns },
  { name: "School", path: "/app/schools", icon: faSchoolFlag },
  { name: "Student", path: "/app/students", icon: faHandsHoldingChild },
  { name: "Staff", path: "/app/staff", icon: faUserPlus },
  { name: "Class", path: "/app/class", icon: faPersonBooth },
  { name: "Message", path: "/app/messages", icon: faMessage },
  { name: "Calendar", path: "/app/calendar", icon: faCalendarDays },
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
  { name: "Calendar", path: "/app/calendar", icon: "fa-calendar" },
];
export const ASSISTANCE_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
  { name: "Add Student", path: "" },
  { name: "Add Staff", path: "" },
  { name: "Add Class", path: "" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "/app/calendar", icon: "fa-calendar" },
];
export const PARENT_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: faTableColumns },
  { name: "Students", path: "/app/students", icon: faHandsHoldingChild },
  { name: "Message", path: "/app/messages", icon: faMessage },
  { name: "Calendar", path: "/app/calendar", icon: faCalendarDays },
  { name: "Exam Time Table", path: "/app/exam", icon: faClipboard },
  { name: "Planner", path: "/app/planner", icon: faCalendarDay },
  { name: "Worksheet", path: "/app/worksheets", icon: faBriefcase },
  { name: "Gallery", path: "/app/galleryview", icon: faPhotoFilm },
  {
    name: "School Holidays",
    path: "/app/schoolHolidays",
    icon: faFaceGrinHearts,
  },
];
export const HELPER_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: "fa-tachometer-alt" },
  { name: "Message", path: "" },
  { name: "Calendar", path: "/app/calendar", icon: "fa-calendar" },
];

export const TEACHER_MENU_LIST = [
  { name: "Dashboard", path: "/app/dash", icon: faTableColumns },
  { name: "Student", path: "/app/students", icon: faHandsHoldingChild },
  { name: "Message", path: "/app/messages", icon: faMessage },
  { name: "Calendar", path: "/app/calendar", icon: faCalendarDays },
  {
    name: "Admin Tool",
    path: "/",
    icon: faWandMagicSparkles,
    child: TEACHER_ADMIN_TOOLS,
  },
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
