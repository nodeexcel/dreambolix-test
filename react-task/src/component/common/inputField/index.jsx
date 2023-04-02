import React from 'react'

export default function InputField({ setInputValue, inputValue }) {
  return (
    <div className=''>
      <label
        htmlFor="small-input"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Enter Task
      </label>
      <input
        type="text"
        id="small-input"
        required
        value={inputValue}
        placeholder="Enter task here"
        onChange={(event) => setInputValue(event.target.value)}
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  )
}
