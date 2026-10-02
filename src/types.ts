export type Role = "student" | "teacher" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  avatar: string;
  joinDate: string;
  active: boolean;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  duration: string;
  rating: number;
  students: number;
  teacher: string;
  teacherId: string;
  image: string;
  status: "published" | "draft" | "inactive";
  updatedAt: string;
  modules: Module[];
  objectives: string[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  contents: Content[];
  activities: Activity[];
}

export interface Content {
  id: string;
  title: string;
  type: "video" | "text" | "document" | "presentation" | "link";
  description: string;
  order: number;
  status: "published" | "draft";
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  instructions: string;
  maxScore: number;
  deadline: string;
  status: "pending" | "submitted" | "graded";
  score?: number;
  courseId: string;
  courseName: string;
  moduleId: string;
  moduleName: string;
}

export interface Enrollment {
  courseId: string;
  progress: number;
  lastContent: string;
  completed: boolean;
}

export type Page =
  | "login"
  | "register"
  | "student-dashboard"
  | "student-explore"
  | "student-course-detail"
  | "student-my-courses"
  | "student-classroom"
  | "student-activities"
  | "student-activity-detail"
  | "student-progress"
  | "student-profile"
  | "teacher-dashboard"
  | "teacher-my-courses"
  | "teacher-create-course"
  | "teacher-edit-course"
  | "teacher-students"
  | "teacher-activities"
  | "teacher-profile"
  | "admin-dashboard"
  | "admin-users"
  | "admin-courses"
  | "admin-categories"
  | "admin-reports"
  | "admin-settings";

export interface AppState {
  currentUser: User | null;
  currentPage: Page;
  selectedCourseId: string | null;
  selectedActivityId: string | null;
}
