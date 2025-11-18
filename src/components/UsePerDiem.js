import { useState, useEffect } from "react";
import countryRates from "./Country";

export const usePerDiem = (selectedCountry) => {
    const [rate, setRate] = useState("");

    useEffect(() => {
        if (selectedCountry && countryRates[selectedCountry]) {
            setRate(countryRates[selectedCountry]);
        } else {
            setRate("");
        }
    }, [selectedCountry]);

    return rate;
};