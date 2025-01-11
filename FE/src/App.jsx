import "./assets/styles/main.scss";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskPage from "./pages/TaskPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<TaskPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
