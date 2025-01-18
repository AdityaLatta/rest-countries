const CountryCard = ({ country }) => {
    return (
        <div className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3">
            <div className="shadow-md bg-white rounded-md dark:bg-Dark-Blue-Elements dark:text-White">
                <div className="h-48 flex">
                    <img
                        src={country.flags.png}
                        alt={country.flags.alt}
                        className=" w-full h-full rounded-md rounded-b-none"
                    />
                </div>

                <div className="h-52 p-6 font-bold">
                    <h2 className="text-xl mb-6">{country.name.official}</h2>

                    <p>
                        Population:&nbsp;
                        <span className="font-extralight">
                            {country.population}
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
