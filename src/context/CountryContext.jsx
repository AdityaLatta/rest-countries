import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const countryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [allCountries, setAllCountries] = useState(null);

    const [countries, setCountries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState([]);
    const [cca3Name, setcca3Name] = useState({});

    const [inputValue, setinputValue] = useState("");

    const [isSearching, setisSearching] = useState(false);

    const getCountryByName = (name, region, returnValue = false) => {
        const filterData = allCountries.filter((country) => {
            const isNameMatch = country.name.common
                .toUpperCase()
                .includes(name.toUpperCase());

            const isRegionMatch =
                country.region.toUpperCase() === region.toUpperCase();

            if (region) {
                return isNameMatch && isRegionMatch;
            } else {
                return isNameMatch;
            }
        });

        if (returnValue) {
            return filterData[0];
        } else {
            setCountries(filterData);
        }
    };

    const getCountriesByRegion = (name = "") => {
        if (name) {
            const filterData = allCountries.filter(
                ({ region }) => region.toUpperCase() === name.toUpperCase()
            );

            setCountries(filterData);
        } else {
            setCountries(allCountries);
        }
    };

    const getCountryByShortName = (name) => {
        const filterData = allCountries.filter(({ cca3 }) => cca3 === name);

        return filterData[0];
    };

    useEffect(() => {
        const getCountries = async () => {
            const res = await axios.get("https://restcountries.com/v3.1/all");

            setAllCountries(res.data);
            setCountries(res.data);

            setLoading(false);

            const regionsArray = res.data.reduce((regionArray, { region }) => {
                if (!regionArray.includes(region)) {
                    regionArray = [...regionArray, region];
                }

                return regionArray;
            }, []);

            const cca3NameObj = res.data.reduce((acc, { cca3, name }) => {
                acc[cca3] = name.common;

                return acc;
            }, {});

            setcca3Name(cca3NameObj);

            setRegions(regionsArray);
        };

        getCountries();
    }, []);

    return (
        <countryContext.Provider
            value={{
                countries,
                loading,
                regions,
                getCountriesByRegion,
                getCountryByName,
                getCountryByShortName,
                isSearching,
                setisSearching,
                inputValue,
                setinputValue,
                cca3Name,
            }}
        >
            {children}
        </countryContext.Provider>
    );
};

export const useCountryData = () => {
    const context = useContext(countryContext);
    if (context === null) {
        throw new Error(
            "useCountryData must be used within a ThemeContextProvider"
        );
    }
    return context;
};
