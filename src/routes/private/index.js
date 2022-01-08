import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { Dashboard } from "../../pages/dashboard";

export function PrivateRoutes() {
  return (
    <Routes>
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}
