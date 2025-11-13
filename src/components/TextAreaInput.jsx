const TextArea = ({ placeholder, label }) => {
  return (
    <div className="mb-6">
      <label className="block text-DARKGRAY-700 font-medium mb-2">{label}</label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none"
        placeholder={placeholder}
        rows="3"
      ></textarea>
    </div>
  );
};

export default TextArea;
