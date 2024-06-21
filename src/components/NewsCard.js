import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { newsDetails, toggleFavorite } from '../redux/slice/newsSlice';
import { useNavigate } from 'react-router-dom';
import newsimage from '../assets/news.jpg';

const NewsCard = ({ news }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const favorites = useSelector((state) => state.news.favorites);

    // Toggle favorite status of a news article
    const handleToggleFavorite = (article) => dispatch(toggleFavorite({ article }));

    // Check if the news article is marked as favorite
    const isFavorite = (article) => favorites.some((fav) => fav.title === article.title);

    // Handle "Read More" button click
    const handleReadMore = () => {
        dispatch(newsDetails(news));
        navigate('/article');
    };

    return (
        <div className="col-md-4">
            <div className="my-3">
                <div className="card card-container">
                    <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
                        <span className="badge rounded-pill bg-danger"> {news.source.name} </span>
                    </div>
                    <img src={!news.urlToImage ? newsimage : news.urlToImage} className="card-img-top fixed-height-image" alt="news" />
                    <div className="card-body">
                        <h5 className="card-title">{news.title}</h5>
                        <p className="card-text news-description">{news.description}</p>
                        <div className="d-flex justify-content-between mt-auto">
                            <button className="btn btn-sm readmorebtn" onClick={handleReadMore}>
                                Read More
                            </button>
                            <button
                                className={`btn btn-sm ${isFavorite(news) ? 'btn-warning text-white' : 'btn'}`}
                                onClick={() => handleToggleFavorite(news)}
                            >
                                <i className={isFavorite(news) ? 'fas fa-star' : 'far fa-star'}></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewsCard;
