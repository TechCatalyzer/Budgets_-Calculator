import Header from "./Header";
import Input from "./Input";
import SelectInput from "./SelectInput";
import TextArea from "./TextAreaInput";

const JourneyDetails = () => {
  const grades = [
    "Ministers and Deputy Ministers",
    "Accounting Officers",
    "Accounting Officers (Non-Accounting)",
    "Chief Directors",
    "Directors",
    "Deputy Directors",
    "Officers",
  ];

  const countries = ["United States", "Canada", "United Kingdom", "Australia"];
  return (
    <div className="min-h-screen bg-BLUE flex flex-col items-center justify-start py-10">
      <Header />
      <div className="bg-WHITE mt-8 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">
          Trip Details
        </h2>
        <hr className="border-BLUE mb-6" />
        <div className="w-full flex gap-8">
          <Input label={"Name"} placeholder={"Enter Full Name"} />
          <Input label={"EC Number"} placeholder={"Enter EC Number"} />
        </div>
        <div>
          <SelectInput label={"Select Grade"} options={grades} />
        </div>
        <div>
          <SelectInput label={"Departure Country"} options={countries} />
        </div>

        <div>
          <TextArea
            label={"Purpose of the journey"}
            placeholder={"Enter the purpose of the journey..."}
          />
        </div>
      </div>
    </div>
  );
};

export default JourneyDetails;
