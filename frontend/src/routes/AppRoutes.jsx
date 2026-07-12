import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import ForgotPassword from "../pages/auth/ForgotPassword";
import VerifyOtp from "../pages/auth/VerifyOtp";
import ResetPassword from "../pages/auth/ResetPassword";
import TeacherAttendance from "../pages/teacher/TeacherAttendance";
import StudentDashboard from "../pages/student/StudentDashboard";
import TeacherDashboard from "../pages/teacher/TeacherDashboard";
import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import StudentDetails from "../pages/admin/StudentDetails";

import Teachers from "../pages/admin/Teachers";
import TeacherDetails from "../pages/admin/TeacherDetails";

import Classes from "../pages/admin/Classes";
import Departments from "../pages/admin/Departments";

import Subjects from "../pages/admin/Subjects";
import SubjectDetails from "../pages/admin/SubjectDetails";

import Attendance from "../pages/admin/Attendance";
import DailyAttendance from "../pages/admin/DailyAttendance";
import MonthlyAttendance from "../pages/admin/MonthlyAttendance";
import AttendanceHistory from "../pages/admin/AttendanceHistory";
import StudentAttendanceReport from "../pages/admin/StudentAttendanceReport";
import SubjectAttendanceReport from "../pages/admin/SubjectAttendanceReport";

import Reports from "../pages/admin/Reports";

import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    if (user.role === "institute-admin") {
      return <Navigate to="/admin" replace />;
    }

    if (user.role === "teacher") {
      return <Navigate to="/teacher/dashboard" replace />;
    }

    if (user.role === "student") {
      return <Navigate to="/student/dashboard" replace />;
    }

    return <Navigate to="/login" replace />;
  }

  return children;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
<Route path="/forgot-password" element={<ForgotPassword />} />
<Route path="/verify-otp" element={<VerifyOtp />} />
<Route
  path="/reset-password"
  element={<ResetPassword />}
/>
        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
          <ProtectedRoute allowedRoles={["institute-admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Students */}
        <Route
          path="/admin/students"
          element={
         <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students/:id"
          element={
         <ProtectedRoute allowedRoles={["institute-admin"]}>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        {/* Teachers */}
        <Route
          path="/admin/teachers"
          element={
         <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/teachers/:id"
          element={
          <ProtectedRoute allowedRoles={["institute-admin"]}>
              <TeacherDetails />
            </ProtectedRoute>
          }
        />

        {/* Classes */}
        <Route
          path="/admin/classes"
          element={
<ProtectedRoute allowedRoles={["institute-admin"]}>
              <Classes />
            </ProtectedRoute>
          }
        />

        {/* Departments */}
        <Route
          path="/admin/departments"
          element={
         <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Departments />
            </ProtectedRoute>
          }
        />

        {/* Subjects */}
        <Route
          path="/admin/subjects"
          element={
        <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/subjects/:id"
          element={
       <ProtectedRoute allowedRoles={["institute-admin"]}>
              <SubjectDetails />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/admin/attendance"
          element={
          <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/daily"
          element={
<ProtectedRoute allowedRoles={["institute-admin"]}>
              <DailyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/monthly"
          element={
        <ProtectedRoute allowedRoles={["institute-admin"]}>
              <MonthlyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/history"
          element={
          <ProtectedRoute allowedRoles={["institute-admin"]}>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/student-report"
          element={
          <ProtectedRoute allowedRoles={["institute-admin"]}>
              <StudentAttendanceReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/subject-report"
          element={
<ProtectedRoute allowedRoles={["institute-admin"]}>
              <SubjectAttendanceReport />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/admin/reports"
          element={
           <ProtectedRoute allowedRoles={["institute-admin"]}>
              <Reports />
            </ProtectedRoute>
          }
        />
        {/* Teacher Dashboard */}

<Route
  path="/teacher/dashboard"
  element={
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/teacher/attendance"
  element={
    <ProtectedRoute allowedRoles={["teacher"]}>
      <TeacherAttendance />
    </ProtectedRoute>
  }
/>

<Route
  path="/student/dashboard"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>
        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;