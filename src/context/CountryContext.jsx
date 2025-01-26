import { createContext, useContext, useEffect, useState } from "react";
import { getCountriesFromApi } from "../api/countriesApi";

const url = import.meta.env.VITE_API_URL;

const countryContext = createContext(null);

export const CountryProvider = ({ children }) => {
    const [allCountries, setAllCountries] = useState([]);

    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState([]);
    const [cca3Name, setcca3Name] = useState({});
    const [subRegions, setSubRegions] = useState([]);

    const [inputValue, setinputValue] = useState("");
    const [isSearching, setisSearching] = useState(false);

    const sortCountries = (key, type = "asc") => {
        if (type === "asc") {
            const sortedData = [...countries].sort((a, b) => a[key] - b[key]);

            setCountries([...sortedData]);
        } else if (type === "dsc") {
            const sortedData = [...countries].sort((a, b) => b[key] - a[key]);

            setCountries([...sortedData]);
        }
    };

    const getCountryByName = (name, region = "", subRegionName = "") => {
        const filterData = allCountries.filter((country) => {
            const isNameMatch = country.name.common
                .toUpperCase()
                .includes(name.toUpperCase());

            const isRegionMatch =
                country.region.toUpperCase() === region.toUpperCase();

            let isSubRegionMatch = false;

            if (country.subregion) {
                isSubRegionMatch =
                    country.subregion.toUpperCase() ===
                    subRegionName.toUpperCase();
            }

            if (region && !subRegionName) {
                return isNameMatch && isRegionMatch;
            } else if (region && subRegionName) {
                return isNameMatch && isRegionMatch && isSubRegionMatch;
            } else {
                return isNameMatch;
            }
        });

        setCountries(filterData);
    };

    const getCountriesByRegionAndSubRegion = (
        regionName = "",
        subRegionName = ""
    ) => {
        if (regionName && !subRegionName) {
            const filterData = allCountries.filter(
                ({ region }) =>
                    regionName.toUpperCase() === region.toUpperCase()
            );

            setCountries(filterData);
        } else if (regionName && subRegionName) {
            const filterData = allCountries.filter(
                ({ region, subregion }) =>
                    regionName.toUpperCase() === region.toUpperCase() &&
                    subRegionName.toUpperCase() === subregion.toUpperCase()
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
                const res = await getCountriesFromApi(
                    "https://restcountries.com/v3.1/all"
                );

                console.log("res---up", res);

                if (res.status != 200) return;

                console.log("res---down", res.data);

                setAllCountries(res.data);
                setCountries(res.data);

                //------------------------------------------------------------

                const regionsArray = res.data.reduce(
                    (regionArray, { region }) => {
                        if (!regionArray.includes(region)) {
                            regionArray = [...regionArray, region];
                        }

                        return regionArray;
                    },
                    []
                );

                console.log("regionsArr---", regionsArray);
                setRegions(regionsArray);

                //-------------------------------------------------------------

                const cca3NameObj = res.data.reduce((acc, { cca3, name }) => {
                    acc[cca3] = name.common;

                    return acc;
                }, {});

                console.log("cca3NameObj---", cca3NameObj);
                setcca3Name(cca3NameObj);

                //-------------------------------------------------------------

                const subRegionsData = res.data.reduce(
                    (acc, { region, subregion }) => {
                        if (region && subregion) {
                            if (acc[region]) {
                                if (!acc[region].includes(subregion)) {
                                    acc[region] = [...acc[region], subregion];
                                }
                            } else {
                                acc[region] = [subregion];
                            }
                        }

                        return acc;
                    },
                    {}
                );

                console.log("subRegionsData---", subRegionsData);
                setSubRegions(subRegionsData);
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
                subRegions,
                getCountriesByRegionAndSubRegion,
                getCountryByName,
                getCountryByShortName,
                setisSearching,
                setinputValue,
                sortCountries,
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
