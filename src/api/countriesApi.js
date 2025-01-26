import axios from "axios";

export const getCountriesFromApi = async (url, retries = 3, delay = 1000) => {
    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        if (retries > 0) {
            await new Promise((resolve) => setTimeout(resolve, delay));
            return fetchData(url, retries - 1, delay);
        } else {
            throw error;
        }
    }
};
