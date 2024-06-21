import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { newsDetails, toggleFavorite } from '../redux/slice/newsSlice';
import newsimage from '../assets/news.jpg';
import { useNavigate } from 'react-router-dom';

const Favorites = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const favorites = useSelector((state) => state.news.favorites);
    const [currentPage, setCurrentPage] = useState(1);
    const articlesPerPage = 6;

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    // Toggle favorite status of an article
    const handleToggleFavorite = (article) => {
        dispatch(toggleFavorite({ article }));
    };

    // Pagination
    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = favorites.slice(indexOfFirstArticle, indexOfLastArticle);
    const totalPages = Math.ceil(favorites.length / articlesPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    // Navigate to article details page
    const handleReadMore = (news) => {
        dispatch(newsDetails(news));
        navigate('/article');
    };

    return (
        <>
            <div className='container-fluid newsTypeTitle'>
                <h1 className="text-center mt-2 headlines">News Portal - Favorites</h1>
            </div>
            <div className="container">
                {favorites.length === 0 ? (
                    <div className="text-center" style={{ marginTop: '20%' }}>
                        <h4>No favorites found</h4>
                    </div>
                ) : (
                    <>
                        <div className="row" style={{ marginTop: '15%' }}>
                            {currentArticles.map((news) => (
                                <div className="col-md-4" key={news.id}>
                                    <div className="my-3">
                                        <div className="card card-container">
                                            <div style={{
                                                display: 'flex',
                                                justifyContent: 'flex-end',
                                                position: 'absolute',
                                                right: '0'
                                            }}>
                                                <span className="badge rounded-pill bg-danger">{news.source.name}</span>
                                            </div>
                                            <img src={!news.urlToImage ? newsimage : news.urlToImage} className="card-img-top fixed-height-image" alt="News" />
                                            <div className="card-body">
                                                <h5 className="card-title" style={{ fontSize: '16px', fontWeight: 600 }}>{news.title}</h5>
                                                <p className="card-text news-description">{news.description}</p>
                                                <div className="d-flex justify-content-between mt-auto">
                                                    <button className="btn btn-sm readmorebtn" onClick={() => handleReadMore(news)}>
                                                        Read More
                                                    </button>
                                                    <button className="btn btn-sm mt-2 btn-warning text-white" onClick={() => handleToggleFavorite(news)}>
                                                        Remove&nbsp;
                                                        <i className={'fas fa-star'}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="d-flex justify-content-center mt-3 my-3">
                            {currentPage > 1 && (
                                <button className="btn btn-custom" onClick={handlePrevPage}><i className="fas fa-angle-left" />&nbsp;Prev</button>
                            )}
                            {[...Array(totalPages)].map((_, index) => (
                                <button
                                    key={index + 1}
                                    className={`btn ${currentPage === index + 1 ? 'btn-custom-active' : 'btn-custom'}`}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </button>
                            ))}
                            {currentPage < totalPages && (
                                <button className="btn btn-custom" onClick={handleNextPage}>Next&nbsp;<i className="fas fa-angle-right" /></button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default Favorites;
