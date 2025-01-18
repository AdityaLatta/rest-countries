import CountryCard from "./CountryCard";

const Countries = ({ countries, loading }) => {
    return (
        <div className="dark:bg-Very-Dark-Blue-Background min-h-dvh pb-10">
            <div className="max-w-desktop m-auto pl-4 pr-4">
                <div className="w-full flex items-center justify-between">
                    <div className="w-full grid grid-cols-12 gap-y-10 sm:gap-x-10">
                        {loading
                            ? "Loading..."
                            : countries.map((country) => (
                                  <CountryCard
                                      key={country.name.official}
                                      country={country}
                                  />
                              ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Countries;
