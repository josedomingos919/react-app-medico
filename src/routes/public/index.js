import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { session } from "../../context/auth/util";

import { Login } from "../../pages/login";
import { isEmpty } from "../../utilities/functions";

export function PublicRoutes() {
  if (!isEmpty(session.get())) {
    return <></>;
  }

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}
