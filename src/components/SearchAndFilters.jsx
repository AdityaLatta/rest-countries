import { useRef, useState } from "react";
import { FaAngleDown, FaSearch } from "react-icons/fa";

const SearchAndFilters = ({
    getCountryByName,
    getCountriesByRegion,
    regions,
}) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [region, setRegion] = useState("");

    const inputHandler = (event) => {
        getCountryByName(event.target.value, region);
    };

    const handleFilter = (event) => {
        if (event.target.innerText === "All") {
            setRegion("");
            getCountriesByRegion();
        } else {
            setRegion(event.target.innerText);
            getCountriesByRegion(event.target.innerText);
        }
    };

    return (
        <div className="dark:bg-Very-Dark-Blue-Background">
            <div className="max-w-desktop m-auto pl-4 pr-4 pt-10 pb-10 dark:bg-Very-Dark-Blue-Background">
                <div className="flex flex-col gap-10 sm:flex-row sm:justify-between sm:items-center">
                    <div className="p-4 pl-8 shadow-lg bg-White w-full max-w-lg rounded-md dark:bg-Dark-Blue-Elements dark:text-White">
                        <FaSearch className="inline" />
                        <input
                            type="text"
                            name="search"
                            id="searchInput"
                            placeholder="Search for a country..."
                            className="outline-none pl-6 w-[90%] dark:bg-Dark-Blue-Elements"
                            onChange={(event) => inputHandler(event)}
                        />
                    </div>

                    <div
                        className="relative"
                        onClick={() => setIsFilterOpen((prev) => !prev)}
                    >
                        <div className="w-48 p-4 pl-6 pr-6 cursor-default bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White">
                            {region ? region : "Filter By Region"}
                            <FaAngleDown className="inline" />
                        </div>

                        <div
                            className={`${
                                isFilterOpen ? "" : "hidden"
                            } w-48 p-4 mt-2 absolute bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White`}
                        >
                            <ul className="w-full">
                                <li
                                    className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md"
                                    onClick={(event) => handleFilter(event)}
                                >
                                    All
                                </li>
                                {regions.map((region) => (
                                    <li
                                        key={region}
                                        className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md"
                                        onClick={(event) => handleFilter(event)}
                                    >
                                        {region}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilters;
