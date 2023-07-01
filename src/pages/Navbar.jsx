import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="mb-4 bg-blue-500 px-4 py-2 text-white font-semibold rounded hover:bg-green-600">
      <div className="flex justify-center border-none p-4">
        <Link to="/" className="text-lg font-bold">
          Home
        </Link>
      </div>
    </div>
  );
}
