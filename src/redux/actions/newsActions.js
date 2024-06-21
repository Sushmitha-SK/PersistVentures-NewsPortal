import { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure } from '../slice/newsSlice';
import { fetchNews, searchNews } from '../../api/newsApi'

// Async function to fetch news data based on category
export const fetchNewsData = (category) => async (dispatch) => {
    try {
        dispatch(fetchNewsStart());
        const response = await fetchNews(category);
        console.log('test response', response)
        dispatch(fetchNewsSuccess(response.data.articles));
    } catch (error) {
        console.log('error', error.message)
        dispatch(fetchNewsFailure(error.message));
    }
};

// Async function to search news data based on search keyword
export const searchNewsData = (keyword) => async (dispatch) => {
    try {
        dispatch(fetchNewsStart());
        const response = await searchNews(keyword);
        dispatch(fetchNewsSuccess(response.data.articles));
    } catch (error) {
        dispatch(fetchNewsFailure(error.message));
    }
};
