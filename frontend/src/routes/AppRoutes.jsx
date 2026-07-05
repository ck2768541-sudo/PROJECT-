import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/public/Home";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Students from "../pages/admin/Students";
import Teachers from "../pages/admin/Teachers";
import Classes from "../pages/admin/Classes";
import StudentDetails from "../pages/admin/StudentDetails";
import TeacherDetails from "../pages/admin/TeacherDetails";
import { useAuth } from "../context/AuthContext";
import Departments from "../pages/admin/Departments";
import Subjects from "../pages/admin/Subjects";
import SubjectDetails from "../pages/admin/SubjectDetails";
import Attendance from "../pages/admin/Attendance";

import DailyAttendance from "../pages/admin/DailyAttendance";
import MonthlyAttendance from "../pages/admin/MonthlyAttendance";

import AttendanceHistory from "../pages/admin/AttendanceHistory";
import StudentAttendanceReport from "../pages/admin/StudentAttendanceReport";
import SubjectAttendanceReport from "../pages/admin/SubjectAttendanceReport";


function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function ComingSoon({ title }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold">{title}</h1>
        <p className="mt-3 text-gray-600">
          This module is under development.
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />












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










        <Route
          path="/admin/teachers"
          element={
            <ProtectedRoute>
              <Teachers />
            </ProtectedRoute>
          }
        />



<Route
  path="/admin/departments"
  element={
    <ProtectedRoute>
      <Departments />
    </ProtectedRoute>
  }
/>

<Route path="/admin/subjects" element={<Subjects />} />
<Route path="/admin/subjects/:id" element={<SubjectDetails />} />
<Route path="/admin/attendance" element={<Attendance />} />
<Route path="/admin/attendance/daily" element={<DailyAttendance />} />
<Route path="/admin/attendance/monthly" element={<MonthlyAttendance />} />




<Route
  path="/admin/teachers/:id"
  element={
    <ProtectedRoute>
      <TeacherDetails />
    </ProtectedRoute>
  }
/>




        <Route
          path="/admin/classes"
          element={
            <ProtectedRoute>
              <Classes />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/attendance"
          element={
            <ProtectedRoute>
              <ComingSoon title="Attendance" />
            </ProtectedRoute>
          }
        />

<Route path="/admin/attendance/history" element={<AttendanceHistory />} />
<Route
  path="/admin/attendance/student-report"
  element={<StudentAttendanceReport />}
/>
<Route
  path="/admin/attendance/subject-report"
  element={<SubjectAttendanceReport />}
/>







        <Route
          path="/admin/reports"
          element={
            <ProtectedRoute>
              <ComingSoon title="Reports" />
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