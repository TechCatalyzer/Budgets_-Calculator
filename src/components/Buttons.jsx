const Buttons = ({ label, onClick }) => {
  return (
    <div className="w-full p-3 gap-8">
      <button
        type="submit"
        onClick={onClick}
        className="w-full border border-DARKGRAY-300 rounded-xl text-20px bg-BLUE hover:bg-DARKGRAY text-WHITE font-MARTEL_SANS-bold py-4 px-8"
      >
        {label}
      </button>
    </div>
  );
};

export default Buttons;
