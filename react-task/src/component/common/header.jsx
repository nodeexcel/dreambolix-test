import React from "react";
import instance from "../../services/api";
import { useNavigate } from "react-router-dom";
export default function Header({ user }) {
  const navigate = useNavigate();
  async function handlelogout() {
    instance
      .post("/user/logout")
      .then(() => navigate("/login?logout=true"))
      .catch(console.error);
  }
  return (
    <div className="fixed bg-blue-900 text-center text-[25px] w-full py-3 font-semibold text-white flex justify-between px-6">
      TASK MAINTAINER
      <div className="flex justify-evenly">
        <h2>Hi {user ?? "user"}</h2>
        <button
          type="button"
          class="mx-5 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          onClick={handlelogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
