import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import { Login } from "../../pages/login";

export function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
