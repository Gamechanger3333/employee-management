import React, { useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getLocalStorage,setLocalStorage } from "@/app/utils/localStorage";
import { AuthContext } from "../../context/AuthProvider";

const CreateTask = () => {
  const [userData, setUserData] = useContext(AuthContext);
  

  // Form state
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const submitHandler = (e) => {
    e.preventDefault();

    // Validation
    if (!taskTitle || !taskDate || !assignTo || !category || !description) {
      alert("Please fill all fields");
      return;
    }





    // Create new task
    const newTask = {
      id: uuidv4(),
      title: taskTitle,
      description: description,
      date: taskDate,
      category: category,
      newTask: true,
      active: false,
      completed: false,
      failed: false,
      assignTo: assignTo,
    };

    // Update userData
    const updatedData = userData.map((employee) => {
      if (employee.id === parseInt(assignTo) || employee.id === assignTo) {
        return {
          ...employee,
          tasks: [...(employee.tasks || []), newTask],
          taskNumbers: {
            ...employee.taskNumbers,
            newTask: employee.taskNumbers.newTask + 1,
          },
        };
      }
      return employee;
    });

    // Update state and localStorage
  setUserData(updatedData);
setLocalStorage(updatedData);

    // Reset form
    setTaskTitle("");
    setTaskDate("");
    setAssignTo("");
    setCategory("");
    setDescription("");

    alert("Task assigned successfully!");
  };

  return (
    <div className="p-5 bg-[#1c1c1c] mt-7 rounded">
      <form
        onSubmit={submitHandler}
        className="flex flex-wrap w-full items-start justify-between"
      >
        <div className="w-1/2">
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Task Title</h3>
            <input
              value={taskTitle}
              onChange={(e) => setTaskTitle(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="Make a UI design"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Date</h3>
            <input
              value={taskDate}
              onChange={(e) => setTaskDate(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="date"
            />
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Assign to</h3>
            <select
              value={assignTo}
              onChange={(e) => setAssignTo(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none  border-[1px] border-gray-400 mb-4"
            >
              <option value="">Select Employee</option>
              {userData &&
                userData.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.firstname || employee.name}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <h3 className="text-sm text-gray-300 mb-0.5">Category</h3>
            <input
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="text-sm py-1 px-2 w-4/5 rounded outline-none bg-transparent border-[1px] border-gray-400 mb-4"
              type="text"
              placeholder="design, dev, etc"
            />
          </div>
        </div>

        <div className="w-2/5 flex flex-col items-start">
          <h3 className="text-sm text-gray-300 mb-0.5">Description</h3>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full h-44 text-sm py-2 px-4 rounded outline-none bg-transparent border-[1px] border-gray-400"
            placeholder="Task description..."
          ></textarea>
          <button  className="bg-emerald-500 py-3 hover:bg-emerald-600 px-5 rounded text-sm mt-4 w-full">
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
