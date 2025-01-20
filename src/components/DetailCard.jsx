import React from "react";
import { useCountryData } from "../context/CountryContext";
import { useNavigate } from "react-router-dom";

const DetailCard = ({ country }) => {
    const { cca3Name } = useCountryData();

    const navigate = useNavigate();

    return (
        <div className="flex flex-col md:flex-row gap-10 justify-between items-center dark:text-White">
            <div className="w-full md:w-1/2 xl:w-[40%]">
                <img src={country.flags.svg} alt={country.flags.alt} />
            </div>

            <div className="w-full md:w-1/2 xl:w-[45%] flex flex-col gap-10">
                <h1 className="text-2xl font-bold">{country.name.common}</h1>
                <div className="flex flex-col justify-between lg:flex-row gap-6">
                    <div>
                        <Line
                            name="Native Name"
                            value={
                                Object.values(country.name.nativeName)[0][
                                    "official"
                                ]
                            }
                        />
                        <Line
                            name="Population"
                            value={country.population.toLocaleString()}
                        />
                        <Line name="Region" value={country.region} />
                        <Line name="Sub-Region" value={country.subregion} />
                        <Line name="Capital" value={country.capital} />
                    </div>
                    <div>
                        <Line name="Top Level Domain" value={country.tld} />
                        <Line
                            name="Currencies"
                            value={country.currenciesArray.join(", ")}
                        />
                        <Line
                            name="Languages"
                            value={Object.values(country.languages)
                                .sort()
                                .join(", ")}
                        />
                    </div>
                </div>

                {country.borders && (
                    <div className="flex flex-wrap gap-4 items-center mt-8">
                        <p className="font-semibold">Border Countries:</p>
                        {country.borders.map((borderCountry) => (
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
                )}
            </div>
        </div>
    );
};

export default DetailCard;

const Line = ({ name, value }) => {
    return (
        <div className="pb-2">
            <p className="font-semibold inline">{name} :</p>
            <span className="inline ml-2">{value}</span>
        </div>
    );
};
