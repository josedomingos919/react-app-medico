import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { PublicRoutes } from "./public";

export function RootRouter() {
  return (
    <Router>
      <PublicRoutes />
    </Router>
  );
}
