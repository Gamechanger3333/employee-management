import React from 'react'

const TaskListNumbers = ({ data }) => {
    // Ensure data exists and has taskNumbers
    const taskNumbers = data?.taskNumbers || {
        newTask: 0,
        active: 0,
        completed: 0,
        failed: 0
    }

    return (
        <div className='flex mt-10 justify-between gap-5 screen'>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-blue-400'>
                <h2 className='text-3xl font-bold'>{taskNumbers.newTask}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>New Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-green-400'>
                <h2 className='text-3xl font-bold'>{taskNumbers.completed}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>Completed Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-yellow-400'>
                <h2 className='text-3xl text-black font-bold'>{taskNumbers.active}</h2>
                <h3 className='text-xl mt-0.5 text-black font-medium'>Accepted Task</h3>
            </div>
            <div className='rounded-xl w-[45%] py-6 px-9 bg-red-400'>
                <h2 className='text-3xl font-bold'>{taskNumbers.failed}</h2>
                <h3 className='text-xl mt-0.5 font-medium'>Failed Task</h3>
            </div>
        </div>
    )
}

export default TaskListNumbers