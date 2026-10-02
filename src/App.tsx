import { useState } from "react";
import type { User, Page } from "./types";
import { AppLayout } from "./components/layout";
import { LoginPage, RegisterPage } from "./pages/auth";
import {
  StudentDashboard, ExploreCoursesPage, CourseDetailPage, MyCoursesPage,
  ClassroomPage, ActivitiesPage, ActivityDetailPage, StudentProgressPage, StudentProfilePage
} from "./pages/student";
import {
  TeacherDashboard, TeacherMyCoursesPage, CreateCoursePage, EditCoursePage,
  TeacherActivitiesPage, TeacherStudentsPage, TeacherProfilePage
} from "./pages/teacher";
import {
  AdminDashboard, AdminUsersPage, AdminCoursesPage, AdminCategoriesPage,
  AdminReportsPage, AdminSettingsPage
} from "./pages/admin";

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [page, setPage] = useState<Page>("login");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  function handleLogin(u: User) {
    setUser(u);
    if (u.role === "student") setPage("student-dashboard");
    else if (u.role === "teacher") setPage("teacher-dashboard");
    else setPage("admin-dashboard");
  }

  function handleLogout() {
    setUser(null);
    setPage("login");
    setSelectedCourseId(null);
    setSelectedActivityId(null);
  }

  function navigate(p: Page, courseId?: string, activityId?: string) {
    if (courseId !== undefined) setSelectedCourseId(courseId);
    if (activityId !== undefined) setSelectedActivityId(activityId);
    setPage(p);
    window.scrollTo({ top: 0 });
  }

  // Auth pages
  if (!user) {
    if (page === "register") return <RegisterPage onNavigateLogin={() => setPage("login")} />;
    return <LoginPage onLogin={handleLogin} onNavigateRegister={() => setPage("register")} />;
  }

  // Classroom has its own full-screen layout
  if (page === "student-classroom") {
    return (
      <ClassroomPage
        user={user}
        onNavigate={navigate}
        selectedCourseId={selectedCourseId}
      />
    );
  }

  const sharedProps = { user, onNavigate: navigate, selectedCourseId, selectedActivityId };

  const pageContent = () => {
    // Student pages
    if (page === "student-dashboard") return <StudentDashboard {...sharedProps} />;
    if (page === "student-explore") return <ExploreCoursesPage {...sharedProps} />;
    if (page === "student-course-detail") return <CourseDetailPage {...sharedProps} />;
    if (page === "student-my-courses") return <MyCoursesPage {...sharedProps} />;
    if (page === "student-activities") return <ActivitiesPage {...sharedProps} />;
    if (page === "student-activity-detail") return <ActivityDetailPage {...sharedProps} />;
    if (page === "student-progress") return <StudentProgressPage />;
    if (page === "student-profile") return <StudentProfilePage {...sharedProps} />;

    // Teacher pages
    if (page === "teacher-dashboard") return <TeacherDashboard user={user} onNavigate={navigate} />;
    if (page === "teacher-my-courses") return <TeacherMyCoursesPage user={user} onNavigate={navigate} />;
    if (page === "teacher-create-course") return <CreateCoursePage user={user} onNavigate={navigate} />;
    if (page === "teacher-edit-course") return <EditCoursePage user={user} onNavigate={navigate} selectedCourseId={selectedCourseId} />;
    if (page === "teacher-activities") return <TeacherActivitiesPage />;
    if (page === "teacher-students") return <TeacherStudentsPage />;
    if (page === "teacher-profile") return <TeacherProfilePage user={user} onNavigate={navigate} />;

    // Admin pages
    if (page === "admin-dashboard") return <AdminDashboard user={user} onNavigate={navigate} />;
    if (page === "admin-users") return <AdminUsersPage />;
    if (page === "admin-courses") return <AdminCoursesPage />;
    if (page === "admin-categories") return <AdminCategoriesPage />;
    if (page === "admin-reports") return <AdminReportsPage />;
    if (page === "admin-settings") return <AdminSettingsPage user={user} onNavigate={navigate} />;

    return <StudentDashboard {...sharedProps} />;
  };

  return (
    <AppLayout user={user} currentPage={page} onNavigate={navigate} onLogout={handleLogout}>
      {pageContent()}
    </AppLayout>
  );
}
