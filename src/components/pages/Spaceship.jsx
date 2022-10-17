import React, { useState, useEffect } from 'react'
import '../styles/spaceship.scss';
import parser from 'html-react-parser';

// API-CALL
import { getSpacecraft, getGallery } from '../../helpers/api';

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";

// IMAGES
import BannerSpaceship from '../../assets/img/banner-spaceship.jpg';

const Rumfærgen = () => {
  useEffect(() => {
    document.title = 'Rumfærgen';
  });

  const [spacecraft, setSpacecraft] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => { // getSpacecraft
    setLoading(true);

    getSpacecraft()
      .then((data) => {
        if (data) {
          setSpacecraft(data);
          setError(false);
        } else {
          setSpacecraft();
          setError(true);
        }
      })
      .finally(setLoading(false));
  }, []);

  const [gallery, setGallery] = useState();

  useEffect(() => { // getGallery
    setLoading(true);

    getGallery()
      .then((data) => {
        if (data) {
          setGallery(data);
          setError(false);
        } else {
          setGallery();
          setError(true);
        }
      })
      .finally(setLoading(false));
  }, []);

  return (
    <div id='spaceship'>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at se vores ture</p>
        </ErrorComp>
      )}

      <div className="cover-image-container">
        <img src={BannerSpaceship} alt="Rumfærgen banner" />
        <h2>Rumfærgen</h2>
      </div>

      <div className="spaceship-content">
        {spacecraft &&
          <div className="about-spaceship-container">
            <img
              src={"http://localhost:4444/images/spacecraft/" + spacecraft.image}
              alt="Billede af jorden"
            />
            <div className="about-spaceship-content">
              <h2>Hvorfor vælge os</h2>
              <h3>{spacecraft && <div>{<div>{spacecraft.title}</div>}</div>}</h3>
              <hr />
              {spacecraft && <div>{<div>{parser(spacecraft.content)}</div>}</div>}
            </div>
          </div>
        }

        <div className="gallery-spaceship-container">
          <h2>Galleri</h2>
          <div className="gallery-spacship-content">
            {gallery && (
              gallery.map((g) => (
                <img
                  src={"http://localhost:4444/images/gallery/" + g.image}
                  alt={g.imagetext}
                />
              ))
            )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rumfærgen