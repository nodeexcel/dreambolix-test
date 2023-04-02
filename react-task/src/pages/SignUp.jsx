import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../component/common/Button";
import instance from "../services/api";

const SignUp = () => {
  const navigate = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (
      !registerData.name ||
      !registerData.email ||
      !registerData.password ||
      !registerData.confirmPassword
    ) {
      alert("All fields required");
      return;
    }
    if (registerData.password === registerData.confirmPassword) {
      if (!registerData.password.match(/^[a-zA-Z0-9]{8,30}$/)) {
        alert(
          "Please enter a password that is 8-30 characters long and contains only letters and digits. Thank you!"
        );
        return;
      }
      const data = {
        firstName: registerData.name.split(" ")[0],
        lastName: registerData.name.split(" ")[1] || " ",
        email: registerData.email,
        password: registerData.password,
        confirm_password: registerData.confirmPassword,
      };

      instance
        .post("user/register", data)
        .then((res) => {
          if (res.data.data.success)
            alert("User Registered Successfully, Please login");
          navigate("/login");
        })
        .catch((res) => {
          alert(res.data.data.error);
        });
    } else {
      alert("password doesn't match");
    }
  };

  const handleChange = (e) => {
    setRegisterData((registerData) => ({
      ...registerData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="h-screen flex bg-gray-bg1">
      <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16">
        <h1 className="text-2xl font-medium text-primary mt-4 mb-12 text-center">
          Create Account 🔐
        </h1>

        <form onSubmit={handleFormSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="name"
              name="name"
              value={registerData?.name}
              placeholder="Your Name"
              onChange={handleChange}
              autoComplete="name"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="email"
              name="email"
              value={registerData?.email}
              placeholder="Your Email"
              onChange={handleChange}
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
              value={registerData?.password}
              placeholder="Your Password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>
          <div>
            <label htmlFor="email">Confirm Password</label>
            <input
              type="password"
              className={`w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
              id="confirmPassword"
              name="confirmPassword"
              value={registerData?.confirmPassword}
              placeholder="Confirm Password"
              onChange={handleChange}
              autoComplete="current-password"
            />
          </div>

          <div className="flex justify-center items-center mt-6 flex-col">
            <Button title={"Signup"} type="submit" />
            <p className="mt-3">
              Already have an account?{" "}
              <Link to="/login" className="text-[blue]">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
