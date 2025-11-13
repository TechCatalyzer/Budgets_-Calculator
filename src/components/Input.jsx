const Input = ({ label, placeholder }) => {
  return (
    <div>
      <label className="block text-xl-DARKGRAY font-medium mb-2">{label}</label>
      <input
        type="text"
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-[#003366] focus:outline-none mb-2"
      />
    </div>
  );
};

export default Input;
