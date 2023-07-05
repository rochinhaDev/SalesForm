import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SaleDetail from "./pages/SaleDetail";
import Navbar from "./components/Navbar";
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/sales/:id" element={<SaleDetail />} />
      </Routes>
    </>
  );
}

export default App;
