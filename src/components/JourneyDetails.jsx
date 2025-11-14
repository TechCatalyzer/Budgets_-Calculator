import Header from "./Header";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextAreaInput";
import Button from "./Buttons";
import Headers from "./Headers";
import countryRates from "../data/Country";

import { useState } from "react";

const JourneyDetails = () => {
  const source = ["Government of Zimbabwe", "External Entity (Non-Government)"];
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

  const [destinationOutBound, setDestinationOutBound] = useState("");
  const [returnDestination, setReturnDestination] = useState("");

  const changeDestinationOutBound = (e) => {
    setDestinationOutBound(e.target.value);
  };

  const changeReturnDestination = (e) => {
    setReturnDestination(e.target.value);
  };

  const handeleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-BLUE flex flex-col items-center justify-start py-10">
      <Header />
      <div className="bg-WHITE mt-8 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">
          Trip Details
        </h2>
        <hr className="border-BLUE mb-6" />
        <form className="w-full" onSubmit={handeleSubmit}>
          <div className="w-full flex gap-8 space-y-6">
            <div className="w-1/2">
              <TextInput label={"Name"} placeholder={"Enter Full Name"} />
            </div>
            <div className="w-1/2">
              <TextInput label={"EC Number"} placeholder={"Enter EC Number"} />
            </div>
          </div>
          <div>
            <SelectInput
              label={"Select Grade"}
              options={grades}
              name={"grades"}
            />
          </div>

          <div>
            <TextArea
              label={"Purpose of the journey"}
              placeholder={"Enter the purpose of the journey..."}
            />
          </div>

          {/*Outbound Journey*/}
          <div>
            <Headers h3={"Outbound Journey"} />
          </div>

          <div>
            <SelectInput
              label={"Departure Country"}
              options={countries}
              name={"departureCountry"}
            />
          </div>

          <div>
            <SelectInput
              label={"Destination Country"}
              options={countries}
              name={"destinationCountry"}
              onChange={changeDestinationOutBound}
            />
          </div>

          <div>
            <TextInput
              label={" Per Diem rate for Destination Coutry"}
              placeholder={"Select Destination Country First"}
              readOnly
              value={
                destinationOutBound ? countryRates[destinationOutBound] : ""
              }
            />
          </div>

          <div>
            <TextInput
              label={"Departure Date & Time"}
              input_type="datetime-local"
            />
          </div>

          <div>
            <TextInput
              label={"Arrival Date & Time"}
              input_type="datetime-local"
            />
          </div>

          {/*Return Journey*/}

          <div>
            <Headers h3={"Return Journey"} />
          </div>

          <div>
            <SelectInput
              label={"Return Departure Country"}
              options={countries}
            />
          </div>

          <div>
            <SelectInput
              label={"Return Destination Country"}
              options={countries}
              value={returnDestination}
              onChange={changeReturnDestination}
            />
          </div>

          <div>
            <TextInput
              label={"Per Diem rate for Destination Coutry"}
              placeholder={"Select Destination Country First"}
              readOnly
              value={returnDestination ? countryRates[returnDestination] : ""}
            />
          </div>

          <div>
            <TextInput
              label={"Return Departure Date & Time"}
              input_type="datetime-local"
            />
          </div>

          <div>
            <TextInput
              label={"Return Arrival Date & Time"}
              input_type="datetime-local"
            />
          </div>

          {/*Add another Return Route*/}

          <div>
            <SelectInput label={"Funding Source"} options={source} />
          </div>

          <div className="w- 1/2 flex gap-8">
            <Button label="Calculate" variant="primary" />
            <Button label="Reset" variant="secondary" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default JourneyDetails;
