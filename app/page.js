"use client";
import React, { useContext, useEffect, useState } from 'react';
import Login from './components/Auth/Login';
import EmployeeDashboard from './components/Dashboard/EmployeeDashboard';
import AdminDashboard from './components/Dashboard/AdminDashboard';
import { AuthContext } from './context/AuthProvider';

const Page = () => {
  const [userRole, setUserRole] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const authData = useContext(AuthContext);

  useEffect(() => {
    if (authData) {
      const storedUser = localStorage.getItem("loggedInUser");

      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser);
          const role = parsedUser?.role;
          const userData = parsedUser?.data;

          setUserRole(role);

          if (role === "admin" && !userData) {
            const adminData = JSON.parse(localStorage.getItem("admin"));
            setLoggedInUserData(Array.isArray(adminData) ? adminData : [adminData]);
          } else {
            setLoggedInUserData(userData);
          }
        } catch (err) {
          console.error("Failed to parse localStorage user data", err);
          localStorage.removeItem("loggedInUser");
        }
      }
    }
  }, [authData]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    setUserRole(null);
    setLoggedInUserData(null);
  };

  const handleLogin = (email, password) => {
    if (!authData) {
      alert("Data is still loading, please try again shortly.");
      return;
    }

    const employees = Array.isArray(authData) ? authData[0] : authData?.employees;
    const admins = Array.isArray(authData) ? authData[1] : authData?.admin;

    if (email === "admin@example.com" && password === "123") {
      const adminUser = Array.isArray(admins) ? admins : [admins];
      setUserRole("admin");
      setLoggedInUserData(adminUser);
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin", data: adminUser }));
    } else if (employees && Array.isArray(employees)) {
      const matchedEmployee = employees.find(emp => emp.email === email && emp.password === password);
      if (matchedEmployee) {
        setUserRole("employee");
        setLoggedInUserData(matchedEmployee);
        localStorage.setItem("loggedInUser", JSON.stringify({ role: "employee", data: matchedEmployee }));
      } else {
        alert("Invalid employee credentials");
      }
    } else {
      alert("Invalid credentials or user data not loaded");
    }
  };

  return (
    <>
      {!userRole && <Login handleLogin={handleLogin} />}

      {userRole === "admin" && (
        <AdminDashboard data={loggedInUserData} changeUser={handleLogout} />
      )}

      {userRole === "employee" && (
        <EmployeeDashboard data={loggedInUserData} changeUser={handleLogout} />
      )}
    </>
  );
};

export default Page;
