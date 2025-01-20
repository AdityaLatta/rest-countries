import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import { useCountryData } from "../context/CountryContext";

const SortFilter = () => {
    const [isSortByOpen, setisSortByOpen] = useState(false);

    const { sortCountries } = useCountryData();

    const handleSortByOpen = () => {
        setisSortByOpen((prev) => !prev);
    };

    const handleSortClick = (key, type) => {
        sortCountries(key, type);
    };

    return (
        <div className="relative" onClick={() => handleSortByOpen()}>
            <div className="w-56 p-4 pl-6 pr-6 cursor-default bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White">
                Sort By
                <FaAngleDown className="inline" />
            </div>

            <div
                className={`${
                    isSortByOpen ? "" : "hidden"
                } w-56 p-4 mt-2 absolute bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White`}
            >
                <ul className="w-full">
                    <li onClick={() => handleSortClick("population", "asc")}>
                        Population (Ascending)
                    </li>
                    <li onClick={() => handleSortClick("population", "dsc")}>
                        Population (Descending)
                    </li>
                    <li onClick={() => handleSortClick("area", "asc")}>
                        Area (Ascending)
                    </li>
                    <li onClick={() => handleSortClick("area", "dsc")}>
                        Area (Descending)
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SortFilter;
