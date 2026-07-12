import { NavLink, useLocation } from "react-router-dom";

import {
  FiGrid,
  FiUsers,
  FiBookOpen,
  FiHome,
  FiClipboard,
  FiClock,
  FiBarChart2,
  FiCalendar,
  FiFileText,
  FiLayers,
  FiUserCheck,
} from "react-icons/fi";

function Sidebar() {
  const location = useLocation();

  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: FiGrid,
    },
    {
      name: "Students",
      path: "/admin/students",
      icon: FiUsers,
    },
    {
      name: "Teachers",
      path: "/admin/teachers",
      icon: FiUserCheck,
    },
    {
      name: "Classes",
      path: "/admin/classes",
      icon: FiHome,
    },
    {
      name: "Departments",
      path: "/admin/departments",
      icon: FiLayers,
    },
    {
      name: "Subjects",
      path: "/admin/subjects",
      icon: FiBookOpen,
    },
    {
      name: "Attendance",
      path: "/admin/attendance",
      icon: FiClipboard,
    },
    {
      name: "Attendance History",
      path: "/admin/attendance/history",
      icon: FiClock,
    },

        {
      name: "Student Report",
      path: "/admin/attendance/student-report",
      icon: FiBarChart2,
    },
    {
      name: "Subject Report",
      path: "/admin/attendance/subject-report",
      icon: FiFileText,
    },
    {
      name: "Daily Attendance",
      path: "/admin/attendance/daily",
      icon: FiCalendar,
    },
    {
      name: "Monthly Attendance",
      path: "/admin/attendance/monthly",
      icon: FiCalendar,
    },
    {
      name: "Reports",
      path: "/admin/reports",
      icon: FiFileText,
    },
  ];

  return (
   <aside className="sticky top-0 flex h-screen w-72 flex-col bg-slate-950 text-white shadow-2xl">

      <div className="border-b border-slate-800 px-6 py-6">
        <h1 className="text-3xl font-extrabold tracking-wide text-white">
          Upsthiti
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Enterprise SaaS
        </p>
      </div>
<nav className="flex-1 space-y-2 px-4 py-6 overflow-y-auto">

        {menuItems.map((item) => {

          const Icon = item.icon;

          const isActive = location.pathname === item.path;

          return (
            <NavLink
              key={item.path}
              to={item.path}
className={`group flex items-center gap-5 rounded-2xl px-5 py-4 transition-all duration-300 ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Icon
                size={20}
                className={`${
                  isActive
                    ? "text-white"
                    : "text-slate-400 group-hover:text-white"
                }`}
              />

              <span className="font-medium">
                {item.name}
              </span>

              {isActive && (
                <div className="ml-auto h-2 w-2 rounded-full bg-white"></div>
              )}
            </NavLink>
          );
        })}
      </nav>

     
    </aside>
  );
}

export default Sidebar;