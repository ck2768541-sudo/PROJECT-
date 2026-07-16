import { useEffect, useState } from "react";
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
  FiMenu,
  FiX,
} from "react-icons/fi";

function Sidebar() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isSidebarOpen]);

  return (
    <>
      {/* Mobile menu button */}
      <button
        type="button"
        onClick={() => setIsSidebarOpen(true)}
        className="absolute left-4 top-4 z-40 flex h-11 w-11 items-center justify-center rounded-xl border border-slate-800 bg-slate-950 text-white shadow-xl transition hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 md:hidden"
        aria-label="Open sidebar"
      >
        <FiMenu size={23} />
      </button>

      {/* Mobile overlay */}
      {isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-[2px] md:hidden"
          aria-label="Close sidebar overlay"
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col border-r border-slate-800/80 bg-slate-950 text-white shadow-2xl transition-transform duration-300 ease-out md:sticky md:z-auto md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-start justify-between border-b border-slate-800/80 px-5 py-5">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-lg font-bold shadow-lg shadow-blue-950/40">
                U
              </div>

              <div className="min-w-0">
                <h1 className="truncate text-2xl font-extrabold tracking-tight text-white">
                  Upsthiti
                </h1>

                <p className="mt-0.5 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
                  Enterprise SaaS
                </p>
              </div>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            type="button"
            onClick={() => setIsSidebarOpen(false)}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
            aria-label="Close sidebar"
          >
            <FiX size={21} />
          </button>
        </div>

        <nav className="flex-1 space-y-1.5 overflow-y-auto px-3 py-5 [scrollbar-width:thin] [scrollbar-color:#334155_transparent]">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={`group relative flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-950/30"
                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                }`}
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition ${
                    isActive
                      ? "bg-white/15 text-white"
                      : "bg-slate-900 text-slate-400 group-hover:bg-slate-800 group-hover:text-white"
                  }`}
                >
                  <Icon size={18} />
                </span>

                <span className="min-w-0 flex-1 truncate">
                  {item.name}
                </span>

                {isActive && (
                  <span className="h-2 w-2 shrink-0 rounded-full bg-white shadow-sm" />
                )}
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800/80 px-4 py-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Admin Portal
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-200">
              Institute Management
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;