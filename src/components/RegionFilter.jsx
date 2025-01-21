import { useCountryData } from "../context/CountryContext";

import { FaAngleDown } from "react-icons/fa";

const RegionFilter = ({
    region,
    isRegionOpen,
    handleRegionClick,
    handleRegionOpen,
}) => {
    const { regions } = useCountryData();

    return (
        <div className="relative z-10" onClick={() => handleRegionOpen()}>
            <div className="w-48 p-4 pl-6 pr-6 cursor-default bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White">
                {region ? region : "Filter By Region"}
                <FaAngleDown className="inline" />
            </div>

            <div
                className={`${
                    isRegionOpen ? "" : "hidden"
                } w-48 p-4 mt-2 sm:absolute bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White`}
            >
                <ul className="w-full">
                    <li
                        className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md"
                        onClick={(event) => handleRegionClick(event)}
                    >
                        All
                    </li>
                    {regions.sort().map((region) => (
                        <li
                            key={region}
                            className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md"
                            onClick={(event) => handleRegionClick(event)}
                        >
                            {region}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default RegionFilter;
