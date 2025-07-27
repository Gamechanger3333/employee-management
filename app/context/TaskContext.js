"use client"; // This is required since you're using hooks like useState

import React, { createContext, useState } from "react";

// Step 1: Create Context
export const TaskContext = createContext();

// Step 2: Create Provider Component
export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]); // Global task state

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  );
};
