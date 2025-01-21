import React from "react";
import { useCountryData } from "../context/CountryContext";
import { useNavigate } from "react-router-dom";

const BorderListing = ({ borders }) => {
    const { cca3Name } = useCountryData();

    const navigate = useNavigate();

    return (
        <div className="flex flex-wrap gap-4 items-center mt-8">
            <p className="font-semibold">Border Countries:</p>
            {borders.map((borderCountry) => (
                <span
                    key={borderCountry}
                    className="pl-4 pr-4 pt-[2px] pb-[2px] rounded shadow-[0_0_2px_1px_rgba(0,0,0,0.3)] cursor-pointer dark:bg-Dark-Blue-Elements"
                    onClick={() => {
                        navigate(`/country/${borderCountry}`, {
                            replace: true,
                        });
                    }}
                >
                    {cca3Name[borderCountry]}
                </span>
            ))}
        </div>
    );
};

export default BorderListing;
