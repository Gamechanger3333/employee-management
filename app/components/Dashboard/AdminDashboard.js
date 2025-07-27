// AdminDashboard.js
import React, { useEffect, useState } from 'react';
import Header from '../other/Header';
import CreateTask from '../other/CreateTask';
import AllTask from '../other/AllTask';
import { getLocalStorage } from '@/app/utils/localStorage'; // Make sure path is correct

const AdminDashboard = ({ data, changeUser }) => {
    const [employees, setEmployees] = useState(data); // Initially use passed data

    useEffect(() => {
        const stored = getLocalStorage(); // Get local storage data
        if (stored?.employees) {
            setEmployees(stored.employees); // Update state
        }
    }, []);

    return (
        <div className='p-10 bg-[#1C1C1C] text-white'>
            <Header data={employees} changeUser={changeUser} />

            {/* Task Creation Form */}
            <CreateTask />

            {/* Employee Task Statistics */}
            <AllTask />
        </div>
    );
};

export default AdminDashboard;
