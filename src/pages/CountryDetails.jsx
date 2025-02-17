import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCountryData } from "../context/CountryContext";

import { FaArrowLeft } from "react-icons/fa6";
import Spinner from "../components/Spinner";
import DetailCard from "../components/DetailCard";

const formatCurrencies = (currencies) =>
    Object.values(currencies || {}).map((obj) => obj.name);

const CountryDetails = () => {
    const { name } = useParams();
    const { getCountryByShortName, loading, cca3Name } = useCountryData();

    const [country, setCountry] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            const countryDetails = getCountryByShortName(name);

            if (cca3Name[name]) {
                countryDetails["currenciesArray"] = formatCurrencies(
                    countryDetails.currencies
                );
                setCountry(countryDetails);
            } else {
                navigate("/not-found");
            }
        }
    }, [loading, name, getCountryByShortName, cca3Name, navigate]);

    return (
        <div className="dark:bg-Very-Dark-Blue-Background">
            <div className="max-w-desktop m-auto pl-4 pr-4 pt-16 pb-10 min-h-dvh dark:bg-Very-Dark-Blue-Background">
                <div className="flex flex-col gap-16">
                    <button
                        onClick={() => navigate(-1)}
                        className="w-32 pt-1 pb-1 shadow-[0_0_5px_1px_rgba(0,0,0,0.3)] rounded-md cursor-pointer dark:text-White"
                    >
                        <FaArrowLeft className="inline" />
                        <span className="pl-3">Back</span>
                    </button>

                    {country ? (
                        <DetailCard country={country} />
                    ) : (
                        <Spinner loading={loading} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default CountryDetails;
