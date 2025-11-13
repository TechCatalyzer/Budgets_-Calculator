import { useState } from "react";

const TextArea = ({ placeholder, label }) => {
  const [text, setText] = useState("");
  const handeleChange = (e) => {
    setText(e.target.value);
    console.log({ text });
  };

  return (
    <div className="mb-6">
      <label className="block text-DARKGRAY-700 font-medium mb-2">
        {label}
      </label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-[#003366] focus:outline-none"
        placeholder={placeholder}
        rows="3"
        value={text}
        onChange={handeleChange}
      ></textarea>
    </div>
  );
};

export default TextArea;
