import Countries from "../components/Countries";
import SearchAndFilters from "../components/SearchAndFilters";
import { useCountryData } from "../context/CountryContext";

const HomePage = () => {
    const {
        countries,
        loading,
        regions,
        getCountriesByRegionAndSubRegion,
        getCountryByName,
    } = useCountryData();

    return (
        <>
            <SearchAndFilters
                getCountryByName={getCountryByName}
                getCountriesByRegionAndSubRegion={
                    getCountriesByRegionAndSubRegion
                }
                regions={regions}
            />
            <Countries countries={countries} loading={loading} />
        </>
    );
};

export default HomePage;
