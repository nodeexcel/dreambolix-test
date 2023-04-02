import React, { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddTask from "./pages/AddTask";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import instance from "./services/api";

const PrivateRoute = ({ element, isAuthenticated }) => {
  return isAuthenticated ? element : <Navigate to="/login" />;
};

const RedirectRoute = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  useEffect(() => {
    instance
      .request({
        method: "post",
        url: "/user/getAuth",
      })
      .then((response) => {
        const data = response.data;
        if (data.success) {
          setIsAuthenticated(data.success);
        }
      })
      .catch(() => {
        setIsAuthenticated(false);
      });
  }, []);

  if (isAuthenticated === null) return <>Application Loading...</>;

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<RedirectRoute isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/login"
            element={
              <Login
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }
          />
          <Route exact path="/register" element={<SignUp />} />
          <Route
            exact
            path="/tasks"
            element={
              <PrivateRoute
                element={<AddTask />}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
