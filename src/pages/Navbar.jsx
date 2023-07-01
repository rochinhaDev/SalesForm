import { Link } from "react-router-dom";
import HomePage from "./HomePage";

export default function Navbar() {
  return (
    <div className="bg-blue-500 px-4 py-2 text-white font-semibold rounded">
      <div className="flex justify-center border p-4">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
      </div>
    </div>
  );
}
