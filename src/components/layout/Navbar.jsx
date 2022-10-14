import React, { useContext, useState, useEffect } from 'react'
import '../styles/layout/navbar.scss';
import { NavLink, Link, useNavigate } from 'react-router-dom'

// API-CALL
import { getTours } from '../../helpers/api';

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";

// ICONS
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';

const Navbar = () => {
    // State - Has the burger been clicked? (true/false)
    const [showBurgermenu, setShowBurgermenu] = useState(false);

    // ----- Search ----------------------
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault(); // // Avoid reload on submit

        navigate('/search/' + e.target.search.value);
    }
    // ----- Search done -----------------

    const [tours, setTours] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    // Call api and get all tours
    useEffect(() => {
        setLoading(true);

        getTours()
            .then((data) => {
                setTours(data);
                setError(false);
            })
            .catch((err) => {
                setError(true);
                setTours();
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <nav className="navbar">

            {loading && <Loader />}

            {error && (
                <ErrorComp>
                    <p>Der skete en fejl, da du prøvede at se vores ture</p>
                </ErrorComp>
            )}

            {/* BURGERMENU */}
            <div className={showBurgermenu ? 'toggle-btn change' : 'toggle-btn'} onClick={() => setShowBurgermenu(!showBurgermenu)}>
                <span className="bar bar1"></span>
                <span className="bar bar2"></span>
                <span className="bar bar3"></span>
            </div>

            {/* NAV - LINKS */}
            <div className={showBurgermenu ? 'navbar-links active' : 'navbar-links'}>
                <ul onClick={() => setShowBurgermenu(!showBurgermenu)}>
                    <li><NavLink to="/" end >Hjem</NavLink></li>
                    <li><NavLink to="/spaceship" >Rumfærgen</NavLink></li>
                    <li><NavLink to="/tours" >Ture</NavLink></li>
                    <li><NavLink to="/gallery" >Galleri</NavLink></li>
                    <li><NavLink to="/safety" >Sikkerhed</NavLink></li>
                    <li><NavLink to="/contact" >Kontakt</NavLink></li>

                    {tours &&
                        <form onSubmit={handleSearch}>
                            <input type="search" name='search' placeholder='Søg i vores ture' />
                            <button type='submit'>Søg...</button>
                        </form>
                    }
                </ul>
            </div>

            <div className="social-media-nav">
                <a href="https://www.facebook.com/" title='SpaceVenture' target="_blank"><FaFacebookF /></a>
                <a href="https://twitter.com/?lang=da" title='SpaceVenture' target="_blank"><FaTwitter /></a>
                <a href="https://www.google.com/intl/da/gmail/about/" title='spaceventure@gmail.com' target="_blank"><FaGooglePlusG /></a>
                <a href="https://www.instagram.com/" title='space_venture' target="_blank"><FaInstagram /></a>
            </div>
        </nav >
    )
}
export default Navbar