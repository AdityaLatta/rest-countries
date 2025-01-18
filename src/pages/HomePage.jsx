import axios from "axios";
import { useEffect, useState } from "react";
import Countries from "../components/Countries";
import SearchAndFilters from "../components/SearchAndFilters";

const HomePage = () => {
    const [allCountries, setAllCountries] = useState(null);

    const [countries, setCountries] = useState(null);
    const [loading, setLoading] = useState(true);
    const [regions, setRegions] = useState([]);

    const getCountryByName = async (name, region) => {
        const filterData = allCountries.filter((country) => {
            const isNameMatch = country.name.official
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

        setCountries(filterData);
    };

    const getCountriesByRegion = async (name = "") => {
        if (name) {
            const filterData = allCountries.filter(
                ({ region }) => region.toUpperCase() === name.toUpperCase()
            );

            setCountries(filterData);
        } else {
            setCountries(allCountries);
        }
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

            setRegions(regionsArray);
        };

        getCountries();
    }, []);
    return (
        <>
            <SearchAndFilters
                getCountryByName={getCountryByName}
                getCountriesByRegion={getCountriesByRegion}
                regions={regions}
            />
            <Countries countries={countries} loading={loading} />
        </>
    );
};

export default HomePage;
