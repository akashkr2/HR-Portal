import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  FaUserTie,
  FaMoneyBill,
  FaCalendarCheck,
  FaCalendarAlt,
  FaChartLine,
  FaFileAlt,
  FaBookOpen,
  FaLifeRing,
  FaBullhorn,
  FaTasks,
  FaBars,
} from "react-icons/fa";
import { BiExit } from "react-icons/bi";

const navItems = [
  { to: "/dashboard/profile", icon: <FaUserTie />, label: "Profile" },
  { to: "/dashboard/payslip", icon: <FaMoneyBill />, label: "Payslip" },
  { to: "/dashboard/leave", icon: <FaCalendarCheck />, label: "Leave" },
  { to: "/dashboard/calendar", icon: <FaCalendarAlt />, label: "Calendar" },
  { to: "/dashboard/performance", icon: <FaChartLine />, label: "Performance" },
  { to: "/dashboard/tasks", icon: <FaTasks />, label: "Tasks" },
  { to: "/dashboard/documents", icon: <FaFileAlt />, label: "Documents" },
  { to: "/dashboard/trainings", icon: <FaBookOpen />, label: "Trainings" },
  { to: "/dashboard/support", icon: <FaLifeRing />, label: "Support" },
  {
    to: "/dashboard/announcements",
    icon: <FaBullhorn />,
    label: "Announcements",
  },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobile = () => setMobileOpen(!mobileOpen);

  const linkClass =
    "flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-primary-focus transition-all";

  const sidebarContent = (
    <div
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-base-100 text-primary-content flex flex-col py-6 px-4 shadow-lg min-h-screen relative transition-all duration-200`}
    >
      <div className="text-xl font-bold mb-10 px-2 flex justify-between items-center">
        {!collapsed && <span>HR Panel</span>}
        <button
          onClick={toggleSidebar}
          className="text-lg text-primary hover:text-primary-focus"
        >
          <FaBars />
        </button>
      </div>

      <nav className="flex flex-col space-y-2 text-base">
        {navItems.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `${linkClass} border-l-4 ${
                isActive
                  ? "bg-primary-focus text-white font-semibold border-primary"
                  : "border-transparent"
              }`
            }
            onClick={() => setMobileOpen(false)} // auto close on mobile
          >
            {icon}
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      <NavLink
        to="/logout"
        className="mt-30 bg-red-600 rounded flex gap-3 items-center px-3 py-3 justify-center text-white"
      >
        <BiExit className="text-2xl font-bold" />
        {!collapsed && <span>Logout</span>}
      </NavLink>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block">{sidebarContent}</div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <button
          onClick={toggleMobile}
          className="p-3 text-2xl text-primary fixed top-4 left-4 z-50 bg-base-100 shadow rounded"
        >
          <FaBars />
        </button>
        {mobileOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-40"
            onClick={toggleMobile}
          />
        )}
        <div
          className={`fixed top-0 left-0 z-50 h-full bg-base-100 shadow-lg transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {sidebarContent}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
