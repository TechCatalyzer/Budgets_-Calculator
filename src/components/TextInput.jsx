const TextInput = ({ label, placeholder, input_type, value, onChange }) => {
  return (
    <div>
      <label className="block text-DARKGRAY-xl font-medium mb-2">{label}</label>
      <input
        type={input_type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-1 focus:ring-[#003366] focus:outline-none mb-2"
      />
    </div>
  );
};

export default TextInput;
