import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";

const RegisterPage = () => {
    const [name, setName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        const value = { name: name, username: username, email: email, password: password };
        try {
            const response = await fetch("http://127.0.0.1:8000/api/signup/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(value),
            });
            const data = await response.json();

            if (data) {
                navigate("/login")
            } else {
                alert("Please enter data correctly")
            }

        } catch (error) {
            console.log(error)
        }
        // console.log({ "email": username, "password": password })
    };

    return (

        <>
            <Navbar />
            <h1 className="container d-flex justify-content-center align-items-center" style={{ marginTop: "20px", marginBottom: "20px" }}>Register Page</h1>


            <div
                className="container d-flex justify-content-center align-items-center"
                style={{ maxWidth: "700px", backgroundColor: "white", padding: "0px" }}>

                <form className="p-4 border shadow w-100">
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">
                            Name:
                        </label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)} />
                    </div>


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
                        <label htmlFor="email" className="form-label">
                            Email:
                        </label>
                        <input
                            type="text"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} />
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
                    <button
                        type="button"
                        className="btn btn-primary"
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            marginTop: "20px",
                            marginLeft: "275px",
                            background: "#E4D00A",
                            border: "none",
                            fontWeight: "bold"
                        }}
                        onClick={handleLogin}>
                        Register
                    </button>
                </form>
            </div>
        </>
    );
};

export default RegisterPage;