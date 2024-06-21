import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    newsData: [],
    loading: false,
    error: null,
    category: '',
    favorites: [],
    articleDetails: [],
    currentPage: 1,
    newsPerPage: 9,
};

export const newsSlice = createSlice({
    name: 'news', //Slice name
    initialState, //Initial State
    reducers: {
        fetchNewsStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        fetchNewsSuccess: (state, action) => {
            state.loading = false;
            state.newsData = action.payload;
        },
        fetchNewsFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        fetchCategory: (state, action) => {
            state.category = action.payload;
        },
        setSearchTerm: (state, action) => {
            state.searchTerm = action.payload;
        },
        toggleFavorite: (state, action) => {
            const { article } = action.payload;
            const index = state.favorites.findIndex(fav => fav.title === article.title);
            if (index === -1) {
                state.favorites.push(article);
            } else {
                state.favorites = state.favorites.filter(fav => fav.title !== article.title);
            }
            localStorage.setItem('favorites', JSON.stringify(state.favorites));
        },
        loadFavorites: (state) => {
            const favorites = localStorage.getItem('favorites');
            state.favorites = favorites ? JSON.parse(favorites) : [];
        },
        newsDetails: (state, action) => {
            state.articleDetails = action.payload;
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
    }
});

export const { fetchNewsStart, fetchNewsSuccess, fetchNewsFailure, fetchCategory, setSearchTerm, toggleFavorite, loadFavorites, newsDetails, setCurrentPage } = newsSlice.actions;

export default newsSlice.reducer;


