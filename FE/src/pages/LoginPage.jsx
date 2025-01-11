import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authService";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const navigate = useNavigate(); // Hook for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      if (isRegister) {
        await registerUser(credentials);
        setMessage({ type: "success", text: "Registration successful! You can now log in." });
        setIsRegister(false);
      } else {
        const response = await loginUser(credentials);
        localStorage.setItem("token", response.data.token);
        setMessage({ type: "success", text: "Login successful!" });

        // Redirect to /tasks after login
        navigate("/tasks");
      }
    } catch (err) {
      // Ensure error messages are strings
      const errorMessage =
        err?.response?.data?.message || "An unexpected error occurred. Please try again.";
      setMessage({ type: "error", text: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <div className="login-form-container">
        {message.text && <div className={`message ${message.type}`}>{message.text}</div>}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit" disabled={loading}>
              {loading
                ? isRegister
                  ? "Registering..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Login"}
            </button>
          </div>
        </form>
        <button
          className="toggle-form-button"
          onClick={() => {
            setIsRegister(!isRegister);
            setMessage({ type: "", text: "" }); // Clear messages
          }}
        >
          {isRegister ? "Already have an account? Login" : "Don't have an account? Register"}
        </button>
      </div>
    </div>
  );
}
