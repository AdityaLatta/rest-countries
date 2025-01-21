import axios from "axios";

const url = import.meta.env.VITE_API_URL;

export const getCountriesFromApi = async () => {
    axios.interceptors.response.use(undefined, (err) => {
        const { config, message } = err;
        if (!config || !config.retry) {
            return Promise.reject(err);
        }
        if (
            !(message.includes("timeout") || message.includes("Network Error"))
        ) {
            return Promise.reject(err);
        }
        config.retry -= 1;
        const delayRetryRequest = new Promise((resolve) => {
            setTimeout(() => {
                console.log("Retry the request", config.url);
                resolve();
            }, config.retryDelay || 1000);
        });
        return delayRetryRequest.then(() => axios(config));
    });

    const res = await axios.get(url, {
        retry: 3,
        retryDelay: 3000,
    });

    return res;
};
