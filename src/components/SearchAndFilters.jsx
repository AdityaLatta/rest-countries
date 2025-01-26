import { useState } from "react";
import { useCountryData } from "../context/CountryContext";

import RegionFilter from "./RegionFilter";
import SearchInput from "./SearchInput";
import SortFilter from "./SortFilter";
import SubRegionFilter from "./SubRegionFilter";

const SearchAndFilters = () => {
    const [isRegionOpen, setIsRegionOpen] = useState(false);
    const [isSubRegionOpen, setIsSubRegionOpen] = useState(false);
    const [region, setRegion] = useState("");
    const [subRegion, setSubRegion] = useState("");

    const {
        inputValue,
        setinputValue,
        getCountryByName,
        getCountriesByRegionAndSubRegion,
    } = useCountryData();

    const inputHandler = (event) => {
        setinputValue(event.target.value);
        getCountryByName(event.target.value, region, subRegion);
    };

    const handleRegionOpen = () => {
        setIsRegionOpen((prev) => !prev);
        setIsSubRegionOpen(false);
    };

    // const handleSubRegionOpen = () => {
    //     setIsSubRegionOpen((prev) => !prev);
    //     setIsRegionOpen(false);
    // };

    const handleRegionClick = (event) => {
        setinputValue("");
        setSubRegion("");
        if (event.target.innerText === "All") {
            setRegion("");
            getCountriesByRegionAndSubRegion();
        } else {
            setRegion(event.target.innerText);
            getCountriesByRegionAndSubRegion(event.target.innerText);
        }
    };

    // const handleSubRegionClick = (event) => {
    //     setinputValue("");
    //     if (event.target.innerText === "All") {
    //         setSubRegion("");
    //         getCountriesByRegionAndSubRegion();
    //     } else {
    //         setSubRegion(event.target.innerText);
    //         getCountriesByRegionAndSubRegion(region, event.target.innerText);
    //     }
    // };

    return (
        <div className="dark:bg-Very-Dark-Blue-Background">
            <div className="max-w-desktop m-auto pl-4 pr-4 pt-10 pb-10 dark:bg-Very-Dark-Blue-Background">
                <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-center">
                    <SearchInput
                        inputValue={inputValue}
                        inputHandler={inputHandler}
                    />

                    <div className="flex gap-5 sm:gap-2 flex-col sm:flex-row">
                        <RegionFilter
                            region={region}
                            isRegionOpen={isRegionOpen}
                            handleRegionClick={handleRegionClick}
                            handleRegionOpen={handleRegionOpen}
                        />

                        {/* <SubRegionFilter
                            region={region}
                            subRegion={subRegion}
                            isSubRegionOpen={isSubRegionOpen}
                            handleSubRegionClick={handleSubRegionClick}
                            handleSubRegionOpen={handleSubRegionOpen}
                        />

                        <SortFilter /> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilters;
