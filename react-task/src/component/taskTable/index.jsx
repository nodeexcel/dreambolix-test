import React from "react";

export default function TaskTable({ todos, handleStatus, handleDelete }) {
  return (
    <table className=" w-full text-sm text-left text-gray-500 dark:text-gray-400 mt-5">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" className="p-4"></th>
          <th scope="col" className="px-6 py-3">
            Task
          </th>
          <th scope="col" className="px-6 py-3">
            Description
          </th>
          <th scope="col" className="px-6 py-3">
            Status
          </th>
          <th scope="col" className="px-6 py-3">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="">
        {todos.map((todo) => {
          return (
            <tr
              key={todo.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    defaultChecked={todo.completed}
                    onClick={() => handleStatus(todo.id)}
                    className="w-4 h-4 text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {todo.title}
              </th>
              <td className="px-6 py-4">{todo.description}</td>
              <td className="px-6 py-4">
                {todo.completed ? "Completed" : "Not Completed"}
              </td>
              <td className="px-6 py-4 ">
                <a
                  href="#"
                  onClick={() => handleDelete(todo.id)}
                  className="font-medium text-blue-900 dark:text-blue-500 hover:underline"
                >
                  delete
                </a>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
