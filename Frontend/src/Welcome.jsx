import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

export default function Welcome() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-purple-600 to-indigo-700 flex items-center justify-center p-8">

      <div className="bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl p-10 w-full max-w-4xl">

        {/* Title */}
        <div className="text-center text-white mb-10">

          <h1 className="text-5xl font-bold mb-3">
            Welcome to To Do Now
          </h1>

          <p className="text-purple-100 text-lg">
            Organize your day. Stay productive. Finish more.
          </p>

        </div>

        {/* Toggle Cards */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* LOGIN */}
          <Link to="/login">

            <div className="group bg-white rounded-3xl p-8 text-center hover:scale-105 transition duration-300 cursor-pointer shadow-lg hover:shadow-purple-500">

              <div className="flex justify-center mb-5">

                <div className="bg-purple-600 p-5 rounded-full text-white text-3xl group-hover:rotate-12 transition">

                  <FaSignInAlt />

                </div>

              </div>

              <h2 className="text-3xl font-bold text-gray-800">
                Login
              </h2>

              <p className="text-gray-500 mt-3">
                Continue managing your tasks
              </p>

              <button
                className="mt-6 bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full"
              >
                Sign In
              </button>

            </div>

          </Link>

          {/* REGISTER */}
          <Link to="/register">

            <div className="group bg-gradient-to-br from-pink-500 to-purple-700 rounded-3xl p-8 text-center hover:scale-105 transition duration-300 cursor-pointer shadow-lg">

              <div className="flex justify-center mb-5">

                <div className="bg-white p-5 rounded-full text-purple-700 text-3xl group-hover:-rotate-12 transition">

                  <FaUserPlus />

                </div>

              </div>

              <h2 className="text-3xl font-bold text-white">
                Register
              </h2>

              <p className="text-purple-100 mt-3">
                Create your account and start today
              </p>

              <button
                className="mt-6 bg-white text-purple-700 hover:bg-gray-100 px-8 py-3 rounded-full font-semibold"
              >
                Create Account
              </button>

            </div>

          </Link>

        </div>

      </div>

    </div>
  );
}