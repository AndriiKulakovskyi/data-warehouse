import { Suspense } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import UserAccountPage from "./components/user/UserAccountPage";
import AdminDashboard from "./components/user/AdminDashboard";
import routes from "tempo-routes";

function App() {
  // Mock user data - in a real app, this would come from authentication
  const userData = {
    isAdmin: true,
    username: "Dr. John Smith",
    email: "john.smith@research.edu",
  };

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <>
        <Routes>
          <Route path="/" element={<Home username={userData.username} />} />
          <Route
            path="/account"
            element={
              <UserAccountPage
                isAdmin={userData.isAdmin}
                username={userData.username}
                email={userData.email}
              />
            }
          />
          {userData.isAdmin && (
            <Route
              path="/admin"
              element={<AdminDashboard username={userData.username} />}
            />
          )}
        </Routes>
        {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
      </>
    </Suspense>
  );
}

export default App;
