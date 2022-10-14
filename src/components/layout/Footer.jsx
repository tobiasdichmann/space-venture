import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import '../styles/layout/footer.scss';

// API-CALL
import { getFooter } from '../../helpers/api';

// COMPONENTS
import Loader from '../Loader';
import ErrorComp from '../ErrorComp';

// ICONS
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { FaLocationArrow } from 'react-icons/fa';
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  const [footer, setFooter] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getFooter()
      .then((data) => {
        if (data) {
          setFooter(data);
          setError(false);
        } else {
          setFooter();
          setError(true);
        }
      })
      .finally(setLoading(false));
  }, []);

  return (
    <footer>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at tilmelde dig nyhedsbrevet</p>
        </ErrorComp>
      )}

      <div className='footer1'>
        <div className="contact">
          <h3>Kontakt</h3>
          {footer && (
            <>
              <p>
                <a href={"tel:" + footer.phone}>
                  <BsFillTelephoneFill className='icon' /> +45 {footer.phone}
                </a>
              </p>

              <p>
                <a href={"mailto:" + footer.email}>
                  <GrMail className='icon' /> {footer.email}
                </a>
              </p>

              <p>
                <a href="https://goo.gl/maps/kLik1LKV2NK6AYZA9" target="_blank">
                  <FaLocationArrow className='icon' /> {footer.address}
                </a>
              </p>
            </>
          )}
        </div>
        <div className="links">
          <h3>Hurtig Links</h3>
          <ul>
            <li><NavLink to="/spaceship" >Rumfærgen</NavLink></li>
            <li><NavLink to="/tours" >Ture</NavLink></li>
            <li><a href='#team'>Vores Team</a></li>
            <li><NavLink to="/gallery" >Galleri</NavLink></li>
            <li><NavLink to="/safety" >Sikkerhed</NavLink></li>
          </ul>
          <NavLink to="/contact" ><button>Kontakt</button></NavLink>
        </div>
      </div>

      <div className="footer2">
        <p>&copy; 2022 Space Venture. All rights reserved</p>
        <div className="social-media-footer">
          <a href="https://www.facebook.com/" title='SpaceVenture' target="_blank"><FaFacebookF /></a>
          <a href="https://twitter.com/?lang=da" title='SpaceVenture' target="_blank"><FaTwitter /></a>
          <a href="https://www.google.com/intl/da/gmail/about/" title='spaceventure@gmail.com' target="_blank"><FaGooglePlusG /></a>
          <a href="https://www.instagram.com/" title='space_venture' target="_blank"><FaInstagram /></a>
        </div>
      </div>
    </footer >
  )
}

export default Footer