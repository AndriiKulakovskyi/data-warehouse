import React from "react";
import { Routes, Route } from "react-router-dom";
import UserAccountPage from "./UserAccountPage";
import AdminDashboard from "./AdminDashboard";

interface UserRoutesProps {
  isAdmin?: boolean;
  username?: string;
  email?: string;
}

const UserRoutes: React.FC<UserRoutesProps> = ({
  isAdmin = false,
  username = "John Researcher",
  email = "john.researcher@example.edu",
}) => {
  return (
    <Routes>
      <Route
        path="/account"
        element={
          <UserAccountPage
            isAdmin={isAdmin}
            username={username}
            email={email}
          />
        }
      />
      {isAdmin && (
        <Route path="/admin" element={<AdminDashboard username={username} />} />
      )}
    </Routes>
  );
};

export default UserRoutes;
