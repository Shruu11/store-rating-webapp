import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";

import Dashboard from "../admin/Dashboard";
import Users from "../admin/Users";
import Stores from "../admin/Stores";
import CreateStore from "../admin/CreateStore";

import UserDashboard from "../user/UserDashboard";
import OwnerDashboard from "../owner/OwnerDashboard";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes({ theme, setTheme }) {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
  path="/admin"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <Dashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/user"
  element={
    <ProtectedRoute allowedRole="USER">
      <UserDashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/owner"
  element={
    <ProtectedRoute allowedRole="STORE_OWNER">
      <OwnerDashboard />
    </ProtectedRoute>
  }
/>

        <Route
  path="/admin/users"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <Users />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/stores"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <Stores />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin/create-store"
  element={
    <ProtectedRoute allowedRole="ADMIN">
      <CreateStore />
    </ProtectedRoute>
  }
/>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;