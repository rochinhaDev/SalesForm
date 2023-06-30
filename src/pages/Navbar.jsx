import { Link } from "react-router-dom";
import HomePage from "./HomePage";

export default function Navbar() {
  return (
    <div className="nav flex justify-center border ">
      <Link to="/">Home</Link>
    </div>
  );
}
