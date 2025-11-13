import Header from "./Header";
import Input from "./Input";
import SelectInput from "./SelectInput";
import TextArea from "./TextAreaInput";
import Button from "./Buttons";
import Headers from "./Headers";
import countryRates from "./Country";


const JourneyDetails = () => {
  const source = ["Government of Zimbabwe", "External Entity (Non-Government)", ];
  const grades = [
    "Select Grade",
    "Ministers and Deputy Ministers",
    "Accounting Officers",
    "Accounting Officers (Non-Accounting)",
    "Chief Directors",
    "Directors",
    "Deputy Directors",
    "Officers",
  ];
  const countries = Object.keys(countryRates);

  return (
    <div className="min-h-screen bg-BLUE flex flex-col items-center justify-start py-10">
      <Header />
      <div className="bg-WHITE mt-8 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">
          Trip Details
        </h2>
        <hr className="border-BLUE mb-6" />
        <div className="w-full flex gap-8 space-y-6">
          <div className="w-1/2">
          <Input label={"Name"} placeholder={"Enter Full Name"} />
          </div>
          <div className="w-1/2">
          <Input label={"EC Number"} placeholder={"Enter EC Number"}/>
          </div>
        </div>
        <div>
          <SelectInput label={"Select Grade"} options={grades} />
        </div>
      
        <div>
          <TextArea
            label={"Purpose of the journey"}
            placeholder={"Enter the purpose of the journey..."}
          />
        </div>

        {/*Outbound Journey*/}
        <div>
          <Headers h3  ={"Outbound Journey"} />
        </div>

        <div>
          <SelectInput label={"Departure Country"} options={countries}
          />
        </div>

        <div>
          <SelectInput label={"Destination Country"} options={countries} 
             />
        </div>

        <div>
          <Input label={" Per Diem rate for Destination Coutry"} placeholder={"0"}
          readOnly />
        </div>

        <div>
          <Input label={"Departure Date & Time"} input_type="datetime-local" />
        </div>

        <div>
          <Input label={"Arrival Date & Time"} input_type= "datetime-local" />
        </div>

        {/*Return Journey*/}

        <div>
          <Headers h3  ={"Return Journey"} />
        </div>

        <div>
          <SelectInput label={"Return Departure Country"} options={countries} />
        </div>

        <div>
          <SelectInput label={"Return Destination Country"} options={countries} />
        </div>

        <div>
          <Input label={"Per Diem rate for Destination Coutry"} placeholder={"0"} />
        </div>

        <div>
          <Input label={"Return Departure Date & Time"} input_type="datetime-local" />
        </div>

        <div>
          <Input label={"Return Arrival Date & Time"} input_type="datetime-local" />
        </div>

        {/*Add another Return Route*/}

        <div>
          <SelectInput label={"Funding Source"} options={source} />
        </div>

    <div className="w- 1/2 flex gap-8">
      <Button label="Calculate" variant="primary" />
      <Button label="Reset"  variant="secondary" />
    </div>

        </div>

      </div>
  
  );
};


export default JourneyDetails;
