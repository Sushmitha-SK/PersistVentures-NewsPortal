import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData } from '../redux/actions/newsActions';
import { fetchCategory, setCurrentPage } from '../redux/slice/newsSlice';
import NewsCard from '../components/NewsCard';

const Home = () => {
    const dispatch = useDispatch();

    // Get state from the Redux store
    const newsData = useSelector((state) => state.news.newsData);
    const categoryData = useSelector((state) => state.news.category);
    const searchTerm = useSelector((state) => state.news.searchTerm);
    const currentPage = useSelector((state) => state.news.currentPage);
    const newsPerPage = useSelector((state) => state.news.newsPerPage);

    // Fetch news data when component mounts or when category or search term changes
    useEffect(() => {
        dispatch(searchTerm ? fetchNewsData('') : fetchCategory(categoryData));
        dispatch(fetchNewsData(categoryData));
        dispatch(setCurrentPage(1));
    }, [dispatch, categoryData, searchTerm]);

    // Capitalize the first letter of a string
    const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

    //Pagination
    const handlePageChange = (pageNumber) => {
        dispatch(setCurrentPage(pageNumber));
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleNextPage = () => {
        if (currentPage < Math.ceil(newsData.length / newsPerPage)) {
            dispatch(setCurrentPage(currentPage + 1));
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            dispatch(setCurrentPage(currentPage - 1));
        }
    };

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNewsData = newsData.slice(indexOfFirstNews, indexOfLastNews);

    return (
        <>
            <div className='container-fluid newsTypeTitle'>
                <h1 className="text-center mt-2 headlines">News Portal - Top {searchTerm ? 'Search' : capitalizeFirstLetter(categoryData)} Headlines</h1>
            </div>
            <div className="container">
                <div className="row" style={{ marginTop: '15%' }}>
                    {currentNewsData.map((news) => (
                        <NewsCard key={news.id} news={news} />
                    ))}
                </div>
            </div>
            <div className="d-flex justify-content-center mt-3 my-4">
                {currentPage > 1 && (
                    <button className="btn btn-custom" onClick={handlePrevPage}><i className="fas fa-angle-left" />&nbsp;Prev</button>
                )}
                {[...Array(Math.ceil(newsData.length / newsPerPage))].map((_, i) => (
                    <button
                        key={i + 1}
                        className={`btn ${currentPage === i + 1 ? 'btn-custom-active' : 'btn-custom'}`}
                        onClick={() => handlePageChange(i + 1)}
                    >
                        {i + 1}
                    </button>
                ))}
                {currentPage < Math.ceil(newsData.length / newsPerPage) && (
                    <button className="btn btn-custom" onClick={handleNextPage}>Next&nbsp;<i className="fas fa-angle-right" /></button>
                )}
            </div>
        </>
    );
};

export default Home;

