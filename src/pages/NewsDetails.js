import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/NewsDetails.css';
import newsimage from '../assets/news.jpg';
import { RotatingTriangles } from 'react-loader-spinner';



const NewsDetails = () => {
    const articleData = useSelector((state) => state.news.articleDetails);

    // Show loader if articleData is not available yet
    if (!articleData) {
        return <div className="loader-container">
            <RotatingTriangles
                visible={true}
                height="80"
                width="80"
                ariaLabel="rotating-triangels-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-triangels-wrapper"
                colors={['#0c8f96', '#15B9C3', '#15B9C3']}
            />
        </div>;
    }

    // Destructure articleData 
    const { title, author, publishedAt, source, url, urlToImage, description, content } = articleData;

    return (
        <>
            <div className='container-fluid newsTypeTitle'>
                <h1 className="text-center mt-2 headlines">News Portal - Article</h1>
            </div>

            <div className='container'>
                <section className='mainContent details'>
                    {title && <h1 className='title'>{title}</h1>}

                    <div className='author'>
                        {author && <p>by {author}</p>}
                        {publishedAt && <p> on {new Date(publishedAt).toLocaleDateString()}</p>}
                    </div>

                    {/* {urlToImage && <img src={urlToImage} alt='News' className="news-image" />} */}
                    <img src={urlToImage || newsimage} alt='News' className="news-image" />


                    {source?.name && (
                        <div className='badge'>
                            <span className="badge rounded-pill bg-danger">{source.name}</span>
                        </div>
                    )}

                    <div className='descbot'>
                        {title && <h1>{title}</h1>}
                        {description && <p>{description}</p>}
                    </div>

                    {content && (
                        <div className='quote'>
                            <i className='fa fa-quote-left'></i>
                            <p>{content}</p>
                        </div>
                    )}

                    {url && (
                        <div className='descbot'>
                            <a rel="noreferrer" href={url} target="_blank" className="btn btn-sm readmorebtn my-2" style={{ width: '100px' }}>Read More</a>
                        </div>
                    )}
                </section>
            </div>
        </>
    );
};

export default NewsDetails;
