import React from 'react'
import '../../styles/sections/tourssection.scss';
import { NavLink } from 'react-router-dom';

// ICONS
import { BsArrowRight } from 'react-icons/bs';

// IMAGES
import MoonImage from '../../../assets/img/moon-btn.jpg';
import MarsImage from '../../../assets/img/mars-btn.jpg';

const Tours = () => {
    return (
        <div id='tours'>
            <div className='tours-container'>
                <div className='moon-tour'>
                    <figure>
                        <NavLink to="/tours/tour/617f8116066b123e4c7c941c"><img src={MoonImage} alt="Billede af månen" /></NavLink>
                    </figure>
                    <h2>Månen</h2>
                </div>

                <div className='mars-tour'>
                    <figure>
                        <NavLink to="/tours/tour/617f80a6066b123e4c7c941a"><img src={MarsImage} alt="Billede af mars" /></NavLink>
                    </figure>
                    <h2>Mars</h2>
                </div>

            </div>

            <NavLink to="/tours">Vores ture <BsArrowRight /></NavLink>
        </div>
    )
}

export default Tours