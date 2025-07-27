import React from 'react';
import { getLocalStorage } from '@/app/utils/localStorage';

const NewTask = ({ data }) => {
  const handleAccept = () => {
    const { employees } = getLocalStorage();

    const updatedEmployees = employees.map(emp => {
      const updatedTasks = emp.tasks.map(task => {
        if (task.id === data.id) {
          return { ...task, newTask: false, active: true };
        }
        return task;
      });

      return {
        ...emp,
        tasks: updatedTasks,
        taskNumbers: {
          ...emp.taskNumbers,
          newTask: emp.taskNumbers.newTask - 1,
          active: emp.taskNumbers.active + 1,
        }
      };
    });

    localStorage.setItem("employees", JSON.stringify(updatedEmployees));
    window.location.reload(); // quick way to reflect the UI
  };

  return (
    <div className="flex-shrink-0 h-full w-[300px] p-5 bg-green-400 rounded-xl">
      <div className="flex justify-between items-center">
        <h3 className="bg-red-500 px-3 py-1 rounded text-sm">{data.category}</h3>
        <h4 className="text-sm">{data.date} </h4>
      </div>
      <h2 className="mt-5 text-2xl font-semibold ">{data.title}</h2>
      <p className="text-sm mt-2">
        {data.description}
      </p>
      <div className='mt-4'>
        <button onClick={handleAccept} className='w-full bg-blue-600 text-white py-2 rounded'>
          Accept Task
        </button>
      </div>
    </div>
  );
};

export default NewTask;
