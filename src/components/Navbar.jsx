import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="shadow-md bg-White dark:bg-Dark-Blue-Elements">
            <div className="max-w-desktop m-auto pl-4 pr-4">
                <div className="h-20 flex items-center justify-between">
                    <a href="/">
                        <div className="text-lg sm:text-2xl font-bold dark:text-White">
                            Where in the world?
                        </div>
                    </a>

                    <div onClick={() => toggleTheme()}>
                        {theme ? (
                            <IoSunnyOutline className="inline mr-1 sm:mr-2 sm:text-xl dark:text-White" />
                        ) : (
                            <IoMoonOutline className="inline mr-1 sm:mr-2 sm:text-xl dark:text-White" />
                        )}

                        <span className="cursor-pointer dark:text-White">
                            {theme ? "Light" : "Dark"} Mode
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
