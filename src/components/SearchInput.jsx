import { FaSearch } from "react-icons/fa";

const SearchInput = ({ inputValue, inputHandler }) => {
    return (
        <div className="p-4 pl-8 shadow-lg bg-White text-Dark-Gray-light-input w-full max-w-lg rounded-md dark:bg-Dark-Blue-Elements dark:text-White">
            <FaSearch className="inline" />
            <input
                type="text"
                name="search"
                id="searchInput"
                value={inputValue}
                placeholder="Search for a country..."
                className="outline-none pl-6 w-[90%] dark:bg-Dark-Blue-Elements"
                onChange={(event) => inputHandler(event)}
            />
        </div>
    );
};

export default SearchInput;
