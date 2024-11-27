import React from "react";
import { Button } from "@mui/material"; // Import MUI Button for better styling
import { useNavigate } from "react-router-dom"; // For React Router v6
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import UserList from "./Components/EmployeeList/employeeList";

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear authentication state (e.g., tokens, user data)
        localStorage.removeItem("jwt"); // Example for token removal

        // Show success toast notification
        // toast.success("Logged out successfully!", {
        //     position: toast.POSITION.TOP_CENTER,
        //     autoClose: 2000,
        //     transition: Bounce,
        // });

        // Redirect to the login page after a slight delay (for toast visibility)
        setTimeout(() => {
            navigate("/");
        }, 2000);
    };

    return (
        <div className="dashboard p-0">
            {/* Blue Gradient for Dashboard Header */}
            <div
                className="d-flex align-items-center justify-content-between"
                style={{
                    background: "linear-gradient(to right, #200e52, #2a5298)", // Blue gradient
                    padding: "20px",
                }}
            >
                <h1 className="text-center flex-grow-1 text-white">Dashboard</h1>
                {/* Logout Button with Same Gradient as Modify Button */}
                <Button
                    onClick={handleLogout}
                    style={{
                        background: "linear-gradient(to right, #8e44ad, #3498db)", // Same gradient as Modify button
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "8px 16px",
                        borderRadius: "8px",
                        border: "none",
                    }}
                    className="me-5 fs-5"
                >
                    Logout
                </Button>
            </div>
            <div className="p-3">
                <UserList />
            </div>
            {/* Add Toast Container for notifications */}
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
