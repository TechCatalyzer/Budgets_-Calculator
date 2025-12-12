import React, { useState } from "react";
import TextInput from "./TextInput";
import Headers from "./Headers";
import Buttons from "./Buttons";
import LeftSidePanel from "./LeftSidePanel";
import { Link } from "react-router-dom";

const SignIn = () => {
  const handleSubmit = (e) => e.preventDefault();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="w-full min-h-screen bg-BLUE flex items-center justify-center">

      <div className="w-[1100px] h-[600px] bg-white rounded-3xl shadow-xl flex overflow-hidden">

        {/* ---------- Left side panel ---------- */}
        <div className="w-1/2 bg-white flex items-center justify-center overflow-hidden">
          <LeftSidePanel />
        </div>

        {/* ---------- Right side panel ---------- */}
        <div className="w-1/2 bg-white p-12">
          <h1 className="text-4xl font-old_standard font-bold mb-2">
            Welcome Back!!
          </h1>

          <Headers h3="Sign In" />

          <form className="w-full mt-6" onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              name="username"
              placeholder="Enter your name"
              value={formData.username}
              onChange={handleInputChange}
            />

            <TextInput
              type="password"
              label="Password"
              name="password"
              placeholder="*******"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Buttons
              label="Sign In"
              type="submit"
            />
            
            <p className="mt-4 text-sm">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold underline text-blue-600 hover:text-blue-800 cursor-pointer">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </div>

    </div>
  );
};

export default SignIn;
