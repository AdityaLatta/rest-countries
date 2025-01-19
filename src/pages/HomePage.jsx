import Countries from "../components/Countries";
import SearchAndFilters from "../components/SearchAndFilters";
import { useCountryData } from "../context/CountryContext";

const HomePage = () => {
    const {
        countries,
        loading,
        regions,
        getCountriesByRegion,
        getCountryByName,
    } = useCountryData();

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
