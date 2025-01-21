import BorderListing from "./BorderListing";

const DetailCard = ({ country }) => {
    const {
        flags,
        name,
        population,
        region,
        subregion,
        capital,
        tld,
        currenciesArray,
        languages,
        borders,
    } = country;

    return (
        <div className="flex flex-col md:flex-row gap-10 justify-between items-center dark:text-White">
            <div className="w-full md:w-1/2 xl:w-[40%]">
                <img src={flags.svg} alt={flags.alt} />
            </div>

            <div className="w-full md:w-1/2 xl:w-[45%] flex flex-col gap-10">
                <h1 className="text-2xl font-bold">{name.common}</h1>
                <div className="flex flex-col justify-between lg:flex-row gap-6">
                    <div>
                        <Line
                            name="Native Name"
                            value={
                                Object.values(name.nativeName)[0]["official"]
                            }
                        />
                        <Line
                            name="Population"
                            value={population.toLocaleString()}
                        />
                        <Line name="Region" value={region} />
                        <Line name="Sub-Region" value={subregion} />
                        <Line name="Capital" value={capital} />
                    </div>
                    <div>
                        <Line name="Top Level Domain" value={tld} />
                        <Line
                            name="Currencies"
                            value={currenciesArray.join(", ")}
                        />
                        <Line
                            name="Languages"
                            value={Object.values(languages).sort().join(", ")}
                        />
                    </div>
                </div>

                {borders && <BorderListing borders={borders} />}
            </div>
        </div>
    );
};

export default DetailCard;

const Line = ({ name, value }) => {
    return (
        <div className="pb-2">
            <p className="font-semibold inline">{name} :</p>
            <span className="inline ml-2">{value}</span>
        </div>
    );
};
