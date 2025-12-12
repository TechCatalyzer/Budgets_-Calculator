import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.jpeg"; // adjust path to your logo

const LoadingScreen = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/signin"); // Redirect after 6 seconds
    }, 6000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="relative flex items-center justify-center h-screen bg-gray-100 overflow-hidden">

      {/* Watermark Logo */}
      <img
        src={logo}
        alt="Logo"
        className="absolute w-[600px] h-[600px] opacity-10 object-contain"
      />

      {/* Loading content centered on watermark */}
      <div className="flex flex-col items-center justify-center z-10">
        {/* Loading Text */}
        <p className="text-2xl font-semibold text-gray-700 tracking-wide">
          Loading...
        </p>

        {/* Loading Bar */}
        <div className="w-64 h-3 bg-gray-300 rounded-full overflow-hidden shadow-inner mt-4">
          <div className="h-full bg-blue-600 rounded-full animate-loading"></div>
        </div>
      </div>

      {/* Keyframes */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }

          .animate-loading {
            animation: loading 6s linear forwards;
          }
        `}
      </style>
    </div>
  );
};

export default LoadingScreen;
