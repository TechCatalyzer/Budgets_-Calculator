import Header from "./Header";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import TextArea from "./TextAreaInput";
import Button from "./Buttons";
import Headers from "./Headers";
import countryRates from "../data/Country";
import PerDiemInput from "./PerDiemInput";
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

  const [step, setStep] = useState(1);

  const [tripDetails, setTripDetails] = useState({
    name: "",
    ecNumber: "",
    grade: "",
    purpose: "",
    departure: "",
    destination: "",
    departureDate: "",
    arrivalDate: "",
    returnDeparture: "",
    returnDestination: "",
    returnDepartureDate: "",
    returnArrivalDate: "",
    source: "",
    perDiem: "",
  });

  const [routes, setRoutes] = useState([{ destination: "", departureDate: "", arrivalDate: "" }]);
  const [returnRoutes, setReturnRoutes] = useState([{ destination: "", departureDate: "", arrivalDate: "" }]);

  const [destinationOutBound, setDestinationOutBound] = useState("");
  const [returnDestination, setReturnDestination] = useState("");

  const handleReset = () => {
    setTripDetails({
      name: "",
      ecNumber: "",
      grade: "",
      purpose: "",
      departure: "",
      destination: "",
      departureDate: "",
      arrivalDate: "",
      returnDeparture: "",
      returnDestination: "",
      returnDepartureDate: "",
      returnArrivalDate: "",
      source: "",
      perDiem: "",
    });
    setRoutes([{ destination: "", departureDate: "", arrivalDate: "" }]);
    setReturnRoutes([{ destination: "", departureDate: "", arrivalDate: "" }]);
    setDestinationOutBound("");
    setReturnDestination("");
  };

  const addRoutes = () => {
    setRoutes([routes, { destination: "", departureDate: "", arrivalDate: "" }]);
  };

  const addReturnRoute = () => {
    setReturnRoutes([returnRoutes, { destination: "", departureDate: "", arrivalDate: "" }]);
  };

  const changeDestinationOutBound = (e) => {
    setDestinationOutBound(e.target.value);
    setTripDetails({tripDetails, destination: e.target.value });
  };

  const changeReturnDestination = (e) => {
    setReturnDestination(e.target.value);
    setTripDetails({tripDetails, returnDestination: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const deleteRoute = (indexToRemove) => {
  setRoutes(routes.filter((_, index) => index !== indexToRemove));
};


  return (
    <div className="min-h-screen bg-BLUE flex flex-col items-center justify-start py-10">
      <Header />
      <div className="bg-WHITE mt-8 rounded-lg shadow-lg w-[90%] md:w-[80%] p-8">
        <form className="w-full" onSubmit={handleSubmit}>
          {/*STEP 1*/}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-semibold text-DARKGRAY mb-4">Trip Details</h2>
              <hr className="border-BLUE mb-6" />

              <div className="w-full flex gap-8 space-y-6">
                <div className="w-1/2">
                  <TextInput
                    label="Name"
                    placeholder="Enter Full Name"
                    value={tripDetails.name}
                    onChange={(e) => setTripDetails({tripDetails, name: e.target.value })}
                  />
                </div>
                <div className="w-1/2">
                  <TextInput
                    label="EC Number"
                    placeholder="Enter EC Number"
                    value={tripDetails.ecNumber}
                    onChange={(e) => setTripDetails({tripDetails, ecNumber: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <SelectInput
                  label="Select Grade"
                  options={grades}
                  value={tripDetails.grade}
                  onChange={(e) => setTripDetails({tripDetails, grade: e.target.value })}
                />
              </div>

              <div>
                <TextArea
                  label="Purpose of the journey"
                  placeholder="Enter the purpose of the journey..."
                  value={tripDetails.purpose}
                  onChange={(e) => setTripDetails({tripDetails, purpose: e.target.value })}
                />
              </div>

              <div className="flex justify-end mt-4 gap-3">
                <Button label="Next" onClick={() => setStep(2)} />
                <Button label="Reset" onClick={handleReset} />
              </div>
            </div>
          )}

          {/*STEP 2*/}
          {step === 2 && (
            <div>
              <Headers h3="Outbound Journey" />
              

              {routes.map((route, index) => (
                <div key={index} className="border border-BLUE p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-BLUE mb-3">Outbound Route {index + 1}</h3>

                  <SelectInput
                    label="Departure Country"
                    options={countries}
                    value={tripDetails.departure}
                    onChange={(e) => setTripDetails({tripDetails, departure: e.target.value })}
                  />

                  <SelectInput
                    label="Destination Country"
                    options={countries}
                    value={tripDetails.destination}
                    onChange={changeDestinationOutBound}
                  />

                  <PerDiemInput
                    value={tripDetails.perDiem || (destinationOutBound ? countryRates[destinationOutBound] : "")}
                    onChange={(e) => setTripDetails({tripDetails, perDiem: e.target.value })}
                  />

                  <TextInput
                    label="Departure Date & Time"
                    input_type="datetime-local"
                    value={tripDetails.departureDate}
                    onChange={(e) => setTripDetails({tripDetails, departureDate: e.target.value })}
                  />

                  <TextInput
                    label="Arrival Date & Time"
                    input_type="datetime-local"
                    value={tripDetails.arrivalDate}
                    onChange={(e) => setTripDetails({tripDetails, arrivalDate: e.target.value })}
                  />
                </div>
              ))}

              <div className="flex justify-start my-4">
                <Button label="Add Another Route" onClick={addRoutes} />
                <Button label="Delete Route" onClick={() => deleteRoute(routes.length - 1)} />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button label="Back" onClick={() => setStep(1)} />
                <Button label="Next" onClick={() => setStep(3)} />
              </div>
            </div>
          )}

          {/*STEP 3*/}
          {step === 3 && (
            <div>
              <Headers h3="Return Journey" />

              {returnRoutes.map((route, index) => (
                <div key={index} className="border border-BLUE p-4 rounded-lg mb-4">
                  <h3 className="text-xl font-bold text-BLUE mb-3">Return Route {index + 1}</h3>

                  <SelectInput
                    label="Return Departure Country"
                    options={countries}
                    value={tripDetails.returnDeparture}
                    onChange={(e) => setTripDetails({tripDetails, returnDeparture: e.target.value })}
                  />

                  <SelectInput
                    label="Return Destination Country"
                    options={countries}
                    value={tripDetails.returnDestination}
                    onChange={changeReturnDestination}
                  />

                  <label className="block text-DARKGRAY-xl font-medium mb-2">Per Diem rate for Destination Country</label>
                  <input
                    type="text"
                    className="w-full bg-transparent placeholder:text-LIGHTGRAY text-DARKGRAY text-sm border border-slate-200 rounded pl-3 pr-8 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                    placeholder="Select Destination Country First"
                    readOnly
                    value={tripDetails.perDiem || (returnDestination ? countryRates[returnDestination] : "")}
                  />

                  <TextInput
                    label="Return Departure Date & Time"
                    input_type="datetime-local"
                    value={tripDetails.returnDepartureDate}
                    onChange={(e) => setTripDetails({tripDetails, returnDepartureDate: e.target.value })}
                  />

                  <TextInput
                    label="Return Arrival Date & Time"
                    input_type="datetime-local"
                    value={tripDetails.returnArrivalDate}
                    onChange={(e) => setTripDetails({tripDetails, returnArrivalDate: e.target.value })}
                  />
                </div>
              ))}

              <div className="w-full flex gap-3 mt-4 ">
                <Button label="Add Another Return Route" onClick={addReturnRoute} />
                <Button label="Delete Route" onClick={() => deleteRoute(returnRoutes.length - 1)} />
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Button label="Back" onClick={() => setStep(2)} />
                <Button label="Next" onClick={() => setStep(4)} />
                <Button label="Reset" onClick={handleReset} />
              </div>
            </div>
          )}

          {/*STEP 4*/}
          {step === 4 && (
            <div>
              <SelectInput
                label="Funding Source"
                options={source}
                value={tripDetails.source}
                onChange={(e) => setTripDetails({tripDetails, source: e.target.value })}
              />

              <div className="w-full flex gap-8 mt-4">
                <Button label="Back" onClick={() => setStep(3)} />
                <Button label="Reset" onClick={handleReset} />
              </div>

              <div className="flex justify-end mt-4">
                <Button label="Calculate" />
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default JourneyDetails;
