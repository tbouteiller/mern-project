import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Nav from "./components/Nav";
import NotFound from "./pages/NotFound";
import CreateWorkout from "./pages/CreateWorkout";
import SingleWorkout from "./pages/SingleWorkout";

function App() {
  return (
    <>
      <Router>
        <div>
          <Nav />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/createworkout" element={<CreateWorkout />} />
              <Route path="/workout/:id" element={<SingleWorkout />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </Router>
      <ToastContainer position="bottom-right" />
    </>
  );
}

export default App;
