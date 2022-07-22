import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Navbar from "./layout/Navbar";
import Dashboard from "./components/Dashboard";
import Main from "./components/Main";
import History from "./components/History";
import Error from "./components/Error";

function App() {
  return (
    <>
      <Navbar />
      <Dashboard />
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/history" element={<History />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
