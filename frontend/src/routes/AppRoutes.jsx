import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

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

function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
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
        <Route path="/signup" element={<Signup />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Students */}
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/students/:id"
          element={
            <ProtectedRoute>
              <StudentDetails />
            </ProtectedRoute>
          }
        />

        {/* Teachers */}
        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/teachers/:id"
          element={
            <ProtectedRoute>
              <TeacherDetails />
            </ProtectedRoute>
          }
        />

        {/* Classes */}
        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        {/* Departments */}
        <Route
          path="/admin/departments"
          element={
            <ProtectedRoute>
              <Departments />
            </ProtectedRoute>
          }
        />

        {/* Subjects */}
        <Route
          path="/admin/subjects"
          element={
            <ProtectedRoute>
              <Subjects />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/subjects/:id"
          element={
            <ProtectedRoute>
              <SubjectDetails />
            </ProtectedRoute>
          }
        />

        {/* Attendance */}
        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/daily"
          element={
            <ProtectedRoute>
              <DailyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/monthly"
          element={
            <ProtectedRoute>
              <MonthlyAttendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/history"
          element={
            <ProtectedRoute>
              <AttendanceHistory />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/student-report"
          element={
            <ProtectedRoute>
              <StudentAttendanceReport />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance/subject-report"
          element={
            <ProtectedRoute>
              <SubjectAttendanceReport />
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <Reports />
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