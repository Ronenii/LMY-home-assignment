import "./assets/styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskPage from "./pages/TaskPage";
import LoginPage from "./pages/LoginPage";
import { isAuthenticated } from "./services/authService";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated() ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/tasks" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
