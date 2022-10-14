import React, { useState, useEffect } from 'react'
import '../../styles/sections/about.scss';
import { NavLink } from 'react-router-dom';
import parser from 'html-react-parser';

// API-CALL
import { getAbout } from '../../../helpers/api';

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";

// IMAGES
import OmOs from '../../../assets/img/om-os.jpg';

const About = () => {
  const [about, setAbout] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getAbout()
      .then((data) => {
        if (data) {
          setAbout(data);
          setError(false);
        } else {
          setAbout();
          setError(true);
        }
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div id="about">
      {
        // If api-call is loading - Wait for data or error
        loading && <Loader />
      }

      {
        // If there is an error from the api
        error && (
          <ErrorComp>
            <p>Der opstod en fejl, da du prøvede at rette denne tour</p>
          </ErrorComp>
        )
      }

      <img
        src={OmOs}
        alt="Billede af jorden"
      />
      <div className="about-content">
        <h2>Lidt om os</h2>
        {about &&
          <>
            <h3>{about.title}</h3>
            <hr />
            {parser(about.content)}
          </>
        }

        <NavLink to="/contact"><button>Kontakt os</button></NavLink>
      </div>
    </div>
  )
}

export default About