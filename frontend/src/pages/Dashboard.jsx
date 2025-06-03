import React, { useState } from "react";
import { Routes, Route, Navigate, useSearchParams } from "react-router-dom";
import Sidebar from "../components/dashboard/Sidebar";
import Profile from "../components/dashboard/Profile";
import Leave from "../components/dashboard/Leave";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-base-200">
        <Routes>
          <Route path="/" element={<Navigate to="profile" />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leave" element={<Leave />} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
