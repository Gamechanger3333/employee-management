import React from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";

const TaskList = ({data = { tasks: [] }}) => {
  console.log(data);
  
  return (
    <div
      id="taskList"
      className="mt-10 rounded-xl h-[55%] overflow-x-auto p-5 flex items-center justify-start gap-5 w-full flex-nowrap "
    >
     {data?.tasks?.map((elem, idx)=>{
if(elem.active){
  return <AcceptTask key={idx} data={elem} />
}

if(elem.newTask){
  return <NewTask key={idx} data={elem} />
}
if(elem.completed){
  return <CompleteTask key={idx} data={elem} />
}
if(elem.failed){
  return <FailedTask key={idx} data={elem} />
}
})}
    </div>
  );
};

export default TaskList;