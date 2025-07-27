
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const AllTask = () => {
    const [userData, setUserData] = useContext(AuthContext)

    const changeTaskStatus = (employeeId, taskId, newStatus) => {
        const updatedData = userData.map(employee => {
            if (employee.id === employeeId) {
                // Get current task before updating
                const currentTask = employee.tasks.find(t => t.id === taskId)
                if (!currentTask) return employee

                const currentStatus = currentTask.newTask ? 'newTask' : 
                                   currentTask.active ? 'active' : 
                                   currentTask.completed ? 'completed' : 'failed'

                const updatedTasks = employee.tasks.map(task => {
                    if (task.id === taskId) {
                        return {
                            ...task,
                            newTask: newStatus === 'newTask',
                            active: newStatus === 'active',
                            completed: newStatus === 'completed',
                            failed: newStatus === 'failed'
                        }
                    }
                    return task
                })

                // Update task numbers
                const updatedTaskNumbers = {
                    ...employee.taskNumbers,
                    [currentStatus]: Math.max(0, employee.taskNumbers[currentStatus] - 1),
                    [newStatus]: employee.taskNumbers[newStatus] + 1
                }

                return {
                    ...employee,
                    tasks: updatedTasks,
                    taskNumbers: updatedTaskNumbers
                }
            }
            return employee
        })

        setUserData(updatedData)
        localStorage.setItem("employees", JSON.stringify(updatedData))
    }

    const getCurrentStatus = (task) => {
        if (task.newTask) return 'newTask'
        if (task.active) return 'active'
        if (task.completed) return 'completed'
        return 'failed'
    }

    const getStatusBadgeClass = (status) => {
        switch (status) {
            case 'newTask': return 'bg-green-500 text-white'
            case 'active': return 'bg-blue-500 text-white'
            case 'completed': return 'bg-orange-500 text-white'
            case 'failed': return 'bg-red-500 text-white'
            default: return 'bg-gray-500 text-white'
        }
    }

    const getStatusDisplayName = (status) => {
        switch (status) {
            case 'newTask': return 'NEW'
            case 'active': return 'ACTIVE'
            case 'completed': return 'COMPLETED'
            case 'failed': return 'FAILED'
            default: return 'UNKNOWN'
        }
    }

    // Collect all tasks from all employees
    const allTasks = []
    if (userData && Array.isArray(userData)) {
        userData.forEach(employee => {
            if (employee.tasks && Array.isArray(employee.tasks) && employee.tasks.length > 0) {
                employee.tasks.forEach(task => {
                    allTasks.push({
                        ...task,
                        employeeName: employee.firstname || employee.name || 'Unknown',
                        employeeId: employee.id,
                        uniqueKey: `${employee.id}-${task.id}` // Add unique key
                    })
                })
            }
        })
    }

    return (
        <div className='bg-[#1c1c1c] p-5 rounded mt-5'>
            <h2 className='text-xl font-medium text-emerald-500 mb-4'>All Assigned Tasks</h2>
            
            {/* Table Header */}
            <div className='bg-red-400 mb-2 py-2 px-4 flex justify-between rounded'>
                <h3 className='text-lg font-medium w-1/4'>Task Details</h3>
                <h3 className='text-lg font-medium w-1/6'>Assigned To</h3>
                <h3 className='text-lg font-medium w-1/6'>Status</h3>
                <h3 className='text-lg font-medium w-1/6'>Category</h3>
                <h3 className='text-lg font-medium w-1/4'>Actions</h3>
            </div>

            {/* Table Body */}
            <div className='max-h-96 overflow-y-auto'>
                {allTasks.length === 0 ? (
                    <div className='text-center py-8 text-gray-400'>
                        <p>No tasks assigned yet. Create your first task above!</p>
                    </div>
                ) : (
                    allTasks.map(task => {
                        const status = getCurrentStatus(task)
                        return (
                            <div key={task.uniqueKey} className='border-2 border-gray-600 mb-2 py-3 px-4 flex justify-between items-center rounded hover:border-emerald-500 transition-colors'>
                                {/* Task Details */}
                                <div className='w-1/4'>
                                    <h4 className='font-medium text-white text-sm'>{task.title}</h4>
                                    <p className='text-xs text-gray-400 mt-1'>{task.date}</p>
                                    <p className='text-xs text-gray-500 mt-1'>
                                        {task.description?.substring(0, 60)}
                                        {task.description?.length > 60 ? '...' : ''}
                                    </p>
                                </div>
                                
                                {/* Assigned To */}
                                <div className='w-1/6'>
                                    <span className='text-white font-medium'>{task.employeeName}</span>
                                </div>
                                
                                {/* Status */}
                                <div className='w-1/6'>
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadgeClass(status)}`}>
                                        {getStatusDisplayName(status)}
                                    </span>
                                </div>
                                
                                {/* Category */}
                                <div className='w-1/6'>
                                    <span className='text-emerald-400 text-sm font-medium'>{task.category}</span>
                                </div>
                                
                                {/* Actions */}
                                <div className='w-1/4 flex gap-2 flex-wrap'>
                                    {status === 'newTask' && (
                                        <button
                                            onClick={() => changeTaskStatus(task.employeeId, task.id, 'active')}
                                            className='bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded text-xs text-white font-medium transition-colors'
                                        >
                                            Activate
                                        </button>
                                    )}
                                    {status === 'active' && (
                                        <>
                                            <button
                                                onClick={() => changeTaskStatus(task.employeeId, task.id, 'completed')}
                                                className='bg-green-500 hover:bg-green-600 px-3 py-1 rounded text-xs text-white font-medium transition-colors'
                                            >
                                                Complete
                                            </button>
                                            <button
                                                onClick={() => changeTaskStatus(task.employeeId, task.id, 'failed')}
                                                className='bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-xs text-white font-medium transition-colors'
                                            >
                                                Fail
                                            </button>
                                        </>
                                    )}
                                    {(status === 'completed' || status === 'failed') && (
                                        <span className='text-gray-400 text-xs italic'>Task Finished</span>
                                    )}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            
            {/* Task Count Summary */}
            {allTasks.length > 0 && (
                <div className='mt-4 flex items-center gap-4 text-sm text-gray-400'>
                    <span>Total Tasks: {allTasks.length}</span>
                    <span className='text-green-400'>New: {allTasks.filter(t => getCurrentStatus(t) === 'newTask').length}</span>
                    <span className='text-blue-400'>Active: {allTasks.filter(t => getCurrentStatus(t) === 'active').length}</span>
                    <span className='text-yellow-600'>Completed: {allTasks.filter(t => getCurrentStatus(t) === 'completed').length}</span>
                    <span className='text-red-600'>Failed: {allTasks.filter(t => getCurrentStatus(t) === 'failed').length}</span>
                </div>
            )}
        </div>
    )
}

export default AllTask