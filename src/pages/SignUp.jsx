import { Link } from "react-router-dom";
import TextInput from "../components/TextInput";
import Headers from "../components/Headers";
import Buttons from "../components/Buttons";
import { useState } from "react";
import LeftSidePanel from "../components/LeftSidePanel";

const SignUp = () => {
  const handleSubmit = (e) => e.preventDefault();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value });
  }


  return (
    <div className="min-h-screen w-full bg-BLUE flex items-center justify-center">
    <div className="w-[1100px] h-[600px] bg-white rounded-3xl shadow-xl flex overflow-hidden">

      {/* ---------- Left side panel ---------- */}
    <div className="w-1/2 bg-white flex items-center justify-center overflow-hidden">
    <LeftSidePanel />
    </div>

      {/* ---------- Right side Panel ---------- */}
      <div className="W-1/2 text-DARKGRAY h-full overflow-y-auto p-10">
        <form className="w-full" onSubmit={handleSubmit}>
        
        <Headers h3="Create an account" />
        <div className="mt-4 text-base mb-6">
        <label>
            Already have an account?
        </label>
        <Link 
            to="/" 
            className="font-semibold underline ml-2 text-blue-600 hover:text-blue-800 cursor-pointer"
        >
            Log in
        </Link>
        </div>


          <div className="flex flex-col md:flex-row gap-4">

            <TextInput
              label="First Name"
              input_type="text"
              placeholder="Enter your first name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />

            <TextInput
              label="Last Name"
              input_type="text"
              placeholder="Enter your last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>

          <TextInput
            label="Username"
            input_type="text"
            placeholder="Enter username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />

          <TextInput
            label="Email"
            input_type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />

          <TextInput
            label="Password"
            input_type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />

          <TextInput
            label="Confirm Password"
            input_type="password"
            placeholder="Confirm your password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />

          <Buttons
            label="Sign Up"
            type="submit"
            //onClick={}
          />

        </form>
        </div>

      </div>

    </div>
  );
};

export default SignUp;
