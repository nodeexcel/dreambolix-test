import React, { useEffect, useState } from "react";
import Button from "../component/common/Button";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "../services/api";

const Login = ({ setIsAuthenticated, isAuthenticated }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const myParam = queryParams.get("logout");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      alert("all the fields are required");
      return;
    }
    axios
      .post("user/login", loginData)
      .then((res) => {
        if (res.data.success) {
          setIsAuthenticated(true);
          navigate("/tasks");
        }
      })
      .catch((error) => {
        alert(error.response.data.error);
      });
  };
  const handleChange = (e) => {
    setLoginData((loginData) => ({
      ...loginData,
      [e.target.name]: e.target.value,
    }));
  };
  useEffect(() => {
    if (myParam) {
      setIsAuthenticated(false);
      return;
    }
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Log into your account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              name="email"
              value={loginData?.email}
              onChange={handleChange}
              placeholder="Your Email"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="password"
              name="password"
              value={loginData?.password}
              onChange={handleChange}
              placeholder="Your Password"
              autoComplete="current-password"
            />
          </div>

          <div className="flex justify-center items-center mt-6 flex-col">
            <Button title={"Login"} type="submit" />
            <p className="mt-3">
              Dont't have an account?{" "}
              <Link to="/register" className="text-[blue]">
                Sign up
              </Link>{" "}
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
