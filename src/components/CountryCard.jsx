import { useNavigate } from "react-router-dom";

const CountryCard = ({ country }) => {
    const navigate = useNavigate();

    return (
        <div
            className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
            onClick={() => navigate(`/country/${country.cca3}`)}
        >
            <div className="shadow-md bg-white text-Very-Dark-Blue-light-text rounded-md dark:bg-Dark-Blue-Elements dark:text-White">
                <div className="h-52 flex">
                    <img
                        src={country.flags.png}
                        alt={country.flags.alt}
                        className="w-full h-full rounded-md rounded-b-none"
                    />
                </div>

                <div className="h-52 p-6 font-bold">
                    <h2 className="text-2xl mb-6">{country.name.common}</h2>

                    <p>
                        Population:&nbsp;
                        <span className="font-extralight">
                            {country.population.toLocaleString()}
                        </span>
                    </p>
                    <p>
                        Region:&nbsp;
                        <span className="font-extralight">
                            {country.region}
                        </span>
                    </p>
                    <p>
                        Capital:&nbsp;
                        <span className="font-extralight">
                            {country.capital}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CountryCard;
