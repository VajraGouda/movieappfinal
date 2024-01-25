import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { jwtDecode } from 'jwt-decode';

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ "username": username, "password": password }),
            });
            const data = await response.json();
            if (!data.access_token) {
                alert("Login Failed");
            } else {

                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("refresh_token", data.refresh_token);
                const decodedToken = jwtDecode(data.access_token);
                localStorage.setItem("user_id", decodedToken.user_id);
                navigate("/");
            }
        } catch (error) {
            console.error("Error logging in:", error);
        }
    };

    return (

        <>
            <Navbar />
            <h1 className="container d-flex justify-content-center align-items-center"
                style={{ marginTop: "20px", marginBottom: "20px" }}>Welcome Back</h1>


            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ maxWidth: "700px", backgroundColor: "white", padding: "0px" }}>
                <form className="p-4 border shadow w-100" onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Username:
                        </label>
                        <input
                            type="text"
                            id="username"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",
                        marginLeft: "275px",
                        background: "#E4D00A",
                        border: "none",
                        fontWeight: "bold"
                    }}>
                        Login
                    </button>
                    <p style={{
                        display: "flex",
                        justifyContent: "center",
                        marginTop: "20px",


                        border: "none",

                    }}>Not a user? <Link to="/register" style={{ paddingLeft: "10px" }}> Register here </Link></p>
                </form>
            </div>
        </>
    );
};

export default LoginPage;
