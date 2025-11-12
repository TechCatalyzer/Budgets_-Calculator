import logo from "../assets/logo.jpeg";

const Header = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg w-[90%] md:w-[80%] p-6 flex flex-col items-center text-center">
      <div className="flex items-center justify-center space-x-3 mb-4">
        <img src={logo} alt="Logo" className="w-16 h-16" />
        <h1 className="text-3xl font-bold text-[#003366]">
          Travel & Subsistence Calculator
        </h1>
      </div>
      <p className="text-gray-600 text-sm">
        Ministry of Finance, Economic Development and Investment Promotion
      </p>
    </div>
  );
};

export default Header;
