import axios from 'axios';

const apiKey = '071cabd394f441729eac9a93306934fd'
const baseURL = 'https://newsapi.org/v2'


//Fetch news articles based on a specific category.
export const fetchNews = async (category) => {
    const url = `${baseURL}/top-headlines?country=in&category=${category}&apiKey=${apiKey}&pageSize=100`;

    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(`Error fetching news for category ${category}: ${error.message}`);
    }
};

//Search news articles based on a search term.
export const searchNews = async (searchTerm) => {
    const url = `${baseURL}/everything?q=${searchTerm}&sortBy=popularity&apiKey=${apiKey}&pageSize=100`;

    try {
        const response = await axios.get(url);
        return response;
    } catch (error) {
        console.log(`Error searching news for term ${searchTerm}: ${error.message}`);
    }
};

