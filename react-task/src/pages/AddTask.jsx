import React, { useEffect, useState } from "react";
import AddButton from "../component/common/addButton";
import DescriptionField from "../component/common/descriptionField";
import Header from "../component/common/header";
import InputField from "../component/common/inputField";
import TaskTable from "../component/taskTable";
import instance from "../services/api";

export default function AddTask() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputDescription, setInputDescription] = useState("");
  const [user, setUser] = useState("User");

  async function handleDelete(id) {
    await instance
      .get("/task/delete", {
        params: { id },
      })
      .catch(console.error);
    instance
      .get("/task/getTask")
      .then(({ data }) => {
        if (data.data.Tasks) {
          setTodos(data.data.Tasks);
        }
      })
      .catch(console.error);
  }


  async function handleSubmit(event) {
    event.preventDefault();
    const newTodo = {
      title: inputValue,
      description: inputDescription,
    };
    await instance.post("/task/saveTask", newTodo).catch(console.error);
    instance
      .get("/task/getTask")
      .then(({ data }) => {
        if (data.data.Tasks) {
          setTodos(data.data.Tasks);
        }
      })
      .catch(console.error);
    setInputDescription("");
    setInputValue("");
  }

  async function handleStatus(id) {
    await instance
      .get("/task/makeComplete", {
        params: { id },
      })
      .catch(console.error);
    instance
      .get("/task/getTask")
      .then(({ data }) => {
        if (data.data.Tasks) {
          setTodos(data.data.Tasks);
        }
      })
      .catch(console.error);
  }

  useEffect(() => {
    instance.get("/task/getTask").then(({ data }) => {
      if (data.data.Tasks) {
        setTodos(data.data.Tasks);
      }
      setUser(data.data.firstName)
    }).catch(console.error);
  }, []);

  return (
    <>
      <Header user={user}/>
      <div className="w-[60%] mx-auto">
        <form onSubmit={handleSubmit} className="pt-[100px]">
          <InputField setInputValue={setInputValue} inputValue={inputValue} />
          <DescriptionField
            setInputDescription={setInputDescription}
            inputDescription={inputDescription}
          />
          <AddButton type="submit" />
        </form>
        {todos?.length > 0 && (
          <TaskTable
            todos={todos}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        )}
      </div>
    </>
  );
}
