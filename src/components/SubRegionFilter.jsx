import { useCountryData } from "../context/CountryContext";

import { FaAngleDown } from "react-icons/fa";

const SubRegionFilter = ({
    region,
    subRegion,
    isSubRegionOpen,
    handleSubRegionClick,
    handleSubRegionOpen,
}) => {
    const { subRegions } = useCountryData();

    return (
        <div className="relative" onClick={() => handleSubRegionOpen()}>
            <div className="w-56 p-4 pl-6 pr-6 cursor-default bg-White shadow-lg rounded-md flex justify-between items-center dark:bg-Dark-Blue-Elements dark:text-White">
                {subRegion ? subRegion : "Filter By SubRegion"}
                <FaAngleDown className="inline" />
            </div>

            <div
                className={`${
                    isSubRegionOpen ? "" : "hidden"
                } w-56 p-4 mt-2 sm:absolute bg-White shadow-lg rounded-md flex justify-between items-center z-10 dark:bg-Dark-Blue-Elements dark:text-White`}
            >
                <ul className="w-full">
                    {region &&
                        subRegions[region] &&
                        subRegions[region].sort().map((region) => (
                            <li
                                key={region}
                                className="w-full pl-2 hover:bg-Very-Dark-Blue-Background hover:text-White rounded-md cursor-pointer"
                                onClick={(event) => handleSubRegionClick(event)}
                            >
                                {region}
                            </li>
                        ))}

                    {region === "" && (
                        <li className="cursor-pointer">Please Select Region</li>
                    )}
                    {region && !subRegions[region] && <li>Not SubRegions</li>}
                </ul>
            </div>
        </div>
    );
};

export default SubRegionFilter;
