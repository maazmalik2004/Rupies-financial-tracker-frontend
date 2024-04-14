import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { useAppState } from "../AppStateContext";


function Login() {
    const { loggedIn, setLoggedIn } = useAppState();
    const [loginStage, setLoginStage] = useState(0);
    const [input, setInput] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        contact: "",
        dob: "",
        monthlyIncome: "",
        gender: "",
    });
    const [errors, setErrors] = useState({});
    const [loginErrors, setLoginErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");

    // Input change handler
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setInput((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        setLoginErrors({});
    };

    // Input validation
    const validateInputs = () => {
        let isValid = true;
        const newErrors = {};

        // Validate according to the current stage
        switch (loginStage) {
            case 1: // Stage 1: Email, Contact, DOB, and Gender
                if (!input.email) {
                    newErrors.email = "Email cannot be empty.";
                    isValid = false;
                }
                if (!input.contact) {
                    newErrors.contact = "Contact cannot be empty.";
                    isValid = false;
                }
                if (!input.dob) {
                    newErrors.dob = "Date of birth cannot be empty.";
                    isValid = false;
                }
                if (!input.gender) {
                    newErrors.gender = "Gender cannot be empty.";
                    isValid = false;
                }
                break;
            case 2: // Stage 2: Monthly Income
                if (!input.monthlyIncome) {
                    newErrors.monthlyIncome = "Monthly income cannot be empty.";
                    isValid = false;
                }
                break;
            case 3: // Stage 3: Username, Password, and Confirm Password
                if (!input.username) {
                    newErrors.username = "Username cannot be empty.";
                    isValid = false;
                }
                if (!input.password) {
                    newErrors.password = "Password cannot be empty.";
                    isValid = false;
                }
                if (!input.confirmPassword) {
                    newErrors.confirmPassword = "Confirm Password cannot be empty.";
                    isValid = false;
                }
                if (input.password !== input.confirmPassword) {
                    newErrors.passwordMatch = "Passwords do not match.";
                    isValid = false;
                }
                break;
        }

        setErrors(newErrors);
        return isValid;
    };

    // Navigation between stages
    const handleNextStageChange = () => {
        if (validateInputs()) {
            setLoginStage((prevStage) => prevStage + 1);
        }
    };

    const handlePrevStageChange = () => {
        setLoginStage((prevStage) => prevStage - 1);
    };

    // Account creation
    const handleCreateAccount = async () => {
        if (validateInputs()) {
            
            try {
                console.log("Sending create account request:", input);
            
                const response = await axios.post("http://localhost:8000/createaccount/", input, {
                    headers: {
                        "Content-Type": "application/json",
                    
                    },
                });
                console.log("Account created successfully:", response.data);
                setSuccessMessage(response.data.message);
                setLoginStage(4);
            } catch (error) {
                console.error("Error creating account:", error);
                setErrors({ accountCreation: error.response?.data?.message || "An error occurred." });
            }
        } else {
            console.log("Validation failed. Please fix the errors and try again.");
        }
    };

    // Login handling
    const handleLogin = async () => {
        const newLoginErrors = {};
        let isValid = true;
    
        // Validate inputs
        if (!input.username) {
            newLoginErrors.username = "Username cannot be empty.";
            isValid = false;
        }
    
        if (!input.password) {
            newLoginErrors.password = "Password cannot be empty.";
            isValid = false;
        }
    
        if (!isValid) {
            setLoginErrors(newLoginErrors);
            return;
        }
    
        try {
            console.log("Sending login request:", input);
            const response = await axios.post("http://localhost:8000/login/", input, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
            console.log("Login successful:", response.data);
            setSuccessMessage(response.data.message);
            setLoginStage(4);
            setLoggedIn(true);
        } catch (error) {
            console.error("Error during login:", error);
            setLoginErrors({ login: error.response?.data?.message || "An error occurred." });
        }
    };

    // Render each login stage
    const renderLoginStage = () => {
        switch (loginStage) {
            case 0:
                return (
                    <div className="login">
                        <h1 >Welcome</h1>
                        <input
                            type="text"
                            className="input"
                            name="username"
                            value={input.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                        />
                        {loginErrors.username && <p className="error-message">{loginErrors.username}</p>}
                        <input
                            type="password"
                            className="input"
                            name="password"
                            value={input.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                        {loginErrors.password && <p className="error-message">{loginErrors.password}</p>}
                        <button type="button" className="button" onClick={handleLogin}>
                            LOG IN
                        </button>
                        <button type="button" className="button" onClick={handleNextStageChange}>
                            SIGN UP
                        </button>
                        {loginErrors.login && <p className="error-message">{loginErrors.login}</p>}
                    </div>
                );
            case 1:
                return (
                    <div className="login">
                        <h1>SIGN UP</h1>
                        <input
                            type="email"
                            className="input"
                            name="email"
                            value={input.email}
                            onChange={handleInputChange}
                            placeholder="Email"
                        />
                        {errors.email && <p className="error-message">{errors.email}</p>}
                        <input
                            type="tel"
                            className="input"
                            name="contact"
                            value={input.contact}
                            onChange={handleInputChange}
                            placeholder="Contact"
                        />
                        {errors.contact && <p className="error-message">{errors.contact}</p>}
                        <input
                            type="date"
                            className="input"
                            name="dob"
                            value={input.dob}
                            onChange={handleInputChange}
                            placeholder="Date of birth"
                            max={new Date().toISOString().split("T")[0]}
                        />
                        {errors.dob && <p className="error-message">{errors.dob}</p>}
                        <select
                            className="input"
                            name="gender"
                            value={input.gender}
                            onChange={handleInputChange}
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        {errors.gender && <p className="error-message">{errors.gender}</p>}
                        <button type="button" className="button" onClick={handleNextStageChange}>
                            NEXT {">"}
                        </button>
                        <button type="button" className="button" onClick={() => setLoginStage(0)}>
                            CANCEL
                        </button>
                    </div>
                );
            case 2:
                return (
                    <div className="login">
                        <h1>2 / 3</h1>
                        <p style={{color:"turquoise"}}>Income is used for personalization purposes, </p>
                        <input
                            type="number"
                            className="input"
                            name="monthlyIncome"
                            value={input.monthlyIncome}
                            onChange={handleInputChange}
                            placeholder="Monthly income"
                        />
                        {errors.monthlyIncome && <p className="error-message">{errors.monthlyIncome}</p>}
                        <button type="button" className="button" onClick={handleNextStageChange}>
                            NEXT {">"}
                        </button>
                        <button type="button" className="button" onClick={handlePrevStageChange}>
                            {"<"} PREV
                        </button>
                        <button type="button" className="button" onClick={() => setLoginStage(0)}>
                            CANCEL
                        </button>
                        <p style={{color:"turquoise"}}>User data is protected (lol)</p>
                    </div>
                );
            case 3:
                return (
                    <div className="login">
                        <h1>3 / 3</h1>
                        <input
                            type="text"
                            className="input"
                            name="username"
                            value={input.username}
                            onChange={handleInputChange}
                            placeholder="Username"
                        />
                        {errors.username && <p className="error-message">{errors.username}</p>}
                        <input
                            type="password"
                            className="input"
                            name="password"
                            value={input.password}
                            onChange={handleInputChange}
                            placeholder="Password"
                        />
                        {errors.password && <p className="error-message">{errors.password}</p>}
                        <input
                            type="password"
                            className="input"
                            name="confirmPassword"
                            value={input.confirmPassword}
                            onChange={handleInputChange}
                            placeholder="Confirm password"
                        />
                        {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                        {errors.passwordMatch && <p className="error-message">{errors.passwordMatch}</p>}
                        <button type="button" className="button" onClick={handleCreateAccount}>
                            CREATE ACCOUNT
                        </button>
                        <button type="button" className="button" onClick={handlePrevStageChange}>
                            {"<"} PREV
                        </button>
                        <button type="button" className="button" onClick={() => setLoginStage(0)}>
                            CANCEL
                        </button>
                    </div>
                );
            case 4:
                return (
                    <div className="login">
                        <h1>{successMessage}</h1>
                        <button type="button" className="button" onClick={() => setLoginStage(0)}>
                            GO BACK
                        </button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="login-container">
            {renderLoginStage()}
        </div>
    );
}

export default Login;
