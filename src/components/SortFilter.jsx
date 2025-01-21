import { useState } from "react";
import { useCountryData } from "../context/CountryContext";

import { FaAngleDown } from "react-icons/fa";

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
        <div className="relative" onClick={handleSortByOpen}>
            <div className="w-56 p-4 pl-6 pr-6 cursor-default bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White">
                Sort By
                <FaAngleDown className="inline" />
            </div>

            <div
                className={`${
                    isSortByOpen ? "" : "hidden"
                } w-56 p-4 mt-2 sm:absolute bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White`}
            >
                <ul className="w-full">
                    <ListItem key="population" value="asc">
                        Population (Ascending)
                    </ListItem>
                    <ListItem key="population" value="dsc">
                        Population (Descending)
                    </ListItem>
                    <ListItem key="area" value="asc">
                        Area (Ascending)
                    </ListItem>
                    <ListItem key="area" value="dsc">
                        Area (Descending)
                    </ListItem>
                </ul>
            </div>
        </div>
    );
};

export default SortFilter;

const ListItem = ({ children, key, value }) => {
    return (
        <li
            className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md cursor-pointer"
            onClick={() => handleSortClick(key, value)}
        >
            {children}
        </li>
    );
};
