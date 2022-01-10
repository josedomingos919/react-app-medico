import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { menuData } from "../../components/sideMenu/util";
import { routes } from "./util";

export function PrivateRoutes() {
  return (
    <Routes>
      {[...menuData, ...routes].map(({ path, element: Element }) => (
        <Route key={path} exact path={path} element={<Element />} />
      ))}
      <Route path="*" element={<Navigate to="/dashboard/home" />} />
    </Routes>
  );
}
