const TextInput = ({ label, placeholder, input_type }) => {
  return (
    <div>
      <label className="block text-DARKGRAY-xl font-medium mb-2">{label}</label>
      <input
        type={input_type}
        placeholder={placeholder}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-[#003366] focus:outline-none mb-2"
      />
    </div>
  );
};

export default TextInput;
