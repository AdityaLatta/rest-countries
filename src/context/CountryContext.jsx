import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const countryContext = createContext();

export const CountryProvider = ({ children }) => {
    const [allCountries, setAllCountries] = useState([]);

    const [countries, setCountries] = useState([]);
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
            try {
                axios.interceptors.response.use(undefined, (err) => {
                    const { config, message } = err;
                    if (!config || !config.retry) {
                        return Promise.reject(err);
                    }
                    // retry while Network timeout or Network Error
                    if (
                        !(
                            message.includes("timeout") ||
                            message.includes("Network Error")
                        )
                    ) {
                        return Promise.reject(err);
                    }
                    config.retry -= 1;
                    const delayRetryRequest = new Promise((resolve) => {
                        setTimeout(() => {
                            console.log("retry the request", config.url);
                            resolve();
                        }, config.retryDelay || 1000);
                    });
                    return delayRetryRequest.then(() => axios(config));
                });

                const res = await axios.get(
                    "https://restcountries.com/v3.1/all",
                    { retry: 3, retryDelay: 3000 }
                );

                setAllCountries(res.data);
                setCountries(res.data);

                const regionsArray = res.data.reduce(
                    (regionArray, { region }) => {
                        if (!regionArray.includes(region)) {
                            regionArray = [...regionArray, region];
                        }

                        return regionArray;
                    },
                    []
                );

                const cca3NameObj = res.data.reduce((acc, { cca3, name }) => {
                    acc[cca3] = name.common;

                    return acc;
                }, {});

                setcca3Name(cca3NameObj);

                setRegions(regionsArray);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        getCountries();
    }, []);

    return (
        <countryContext.Provider
            value={{
                countries,
                loading,
                regions,
                isSearching,
                inputValue,
                cca3Name,
                getCountriesByRegion,
                getCountryByName,
                getCountryByShortName,
                setisSearching,
                setinputValue,
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
