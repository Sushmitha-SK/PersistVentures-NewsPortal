import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchNewsData, searchNewsData } from './../redux/actions/newsActions';
import { fetchCategory, setSearchTerm } from '../redux/slice/newsSlice';
import hamburger from '../assets/icon-hamburger.svg';
import close from '../assets/icon-close.svg';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { RotatingTriangles } from 'react-loader-spinner';

const Navbar = () => {
    const [click, setClick] = useState(false);
    const [loading, setLoading] = useState(false);
    const searchTerm = useSelector((state) => state.news.searchTerm);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const favorites = useSelector((state) => state.news.favorites);

    // Toggle hamburger menu
    const handleClick = () => setClick(!click);

    // Handle category click
    const handleCategoryClick = async (category) => {
        setLoading(true);
        dispatch(setSearchTerm(''));
        await dispatch(fetchCategory(category));
        await dispatch(fetchNewsData(category));
        setLoading(false);
        navigate('/')
    };

    // Handle navigation to homepage
    const handleNavigation = () => {
        dispatch(setSearchTerm(''));
        dispatch(fetchCategory('business'));
        dispatch(fetchNewsData('business'));
        navigate('/');
    };

    // Handle search functionality
    const handleSearch = async () => {
        setLoading(true);
        await dispatch(searchNewsData(searchTerm));
        setLoading(false);
    };

    // Handle input change in search field
    const handleInputChange = (e) => {
        dispatch(setSearchTerm(e.target.value));
    };

    return (
        <>
            <nav className='navbar'>
                <div className='navbar-container'>
                    <div className='logo'>
                        <a className="navbar-brand logo" onClick={handleNavigation}>News Portal</a>
                    </div>

                    <div className='menu-icon' onClick={handleClick}>
                        {click ? (
                            <img src={close} alt='close icon' />
                        ) : (
                            <img src={hamburger} alt='hamburger icon' />
                        )}
                    </div>

                    <ul className={click ? 'navbar-nav nav-menu active' : 'navbar-nav nav-menu'}>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('business')}>Business</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('entertainment')}>Entertainment</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('general')}>General</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('health')}>Health</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('science')}>Science</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('sports')}>Sports</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link className="nav-link" onClick={() => handleCategoryClick('technology')}>Technology</Link>
                        </li>
                        <li className='nav-item menu-item'>
                            <div className="search_container text-center">
                                <input
                                    type="search"
                                    name="search"
                                    placeholder="Search.."
                                    className='search_input'
                                    value={searchTerm}
                                    onChange={handleInputChange}
                                />
                                <button className='search_button' onClick={handleSearch}>
                                    <i className="fas fa-search"></i>
                                </button>
                            </div>
                        </li>
                        <li className='nav-item menu-item'>
                            <Link to="/favorites" className="nav-link">
                                <i className="fas fa-star "></i>
                                <span className="nav-link-text"><sup>{favorites.length}</sup></span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            {loading && (
                <div className="loader-container">
                    <RotatingTriangles
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="rotating-triangels-loading"
                        wrapperStyle={{}}
                        wrapperClass="rotating-triangels-wrapper"
                        colors={['#0c8f96', '#15B9C3', '#15B9C3']}
                    />
                </div>
            )}
        </>
    );
};

export default Navbar;
