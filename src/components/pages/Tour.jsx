import React, { useState, useEffect } from "react";
import '../styles/tour.scss';
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

// API-CALL
import { getTourById } from "../../helpers/api";

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";

// ICONS
import { FaFacebookF, FaTwitter, FaGooglePlusG, FaInstagram } from 'react-icons/fa';

const Tour = () => {
  // Get the ID (from the url) of the tour you want to see - "Læs mere" (is a parameter - check in App.js)
  const { tourID } = useParams();
  console.log(tourID)

  const [tour, setTour] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    getTourById(tourID)
      .then((data) => {
        setTour(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setTour();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [tourID]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  return (
    <div id="tour">
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der er sket en fejl, da du prøvede at læse mere om denne tour</p>
        </ErrorComp>
      )}

      {tour && (
        <div className="tour-container">
          <div className="tour-img-container">
            <img src={"http://localhost:4444/images/tours/" + tour.image1} alt={tour.destination + ": Billede 1"} />
            <img src={"http://localhost:4444/images/tours/" + tour.image2} alt={tour.destination + ": Billede 2"} />
          </div>

          <div className="tour-content">
            <h1>{tour.destination}</h1>

            <hr className="blue-underline" />

            <h2>{tour.title}</h2>
            {parse(tour.content)}

            <hr />

            <h3>Destination: <div>{tour.destination}</div></h3>
            <h3>Pris: <div>{tour.price}</div></h3>
            <h3>Afstand fra jorden: <div>{tour.distance}</div></h3>
            <h3>Flyvetid: <div>{tour.traveltime}</div></h3>

            <hr />

            <div className="social-media-tour">
              <h4>Share
                <a href="https://www.facebook.com/" title='SpaceVenture' target="_blank"><FaFacebookF /></a>
                <a href="https://twitter.com/?lang=da" title='SpaceVenture' target="_blank"><FaTwitter /></a>
                <a href="https://www.google.com/intl/da/gmail/about/" title='spaceventure@gmail.com' target="_blank"><FaGooglePlusG /></a>
                <a href="https://www.instagram.com/" title='space_venture' target="_blank"><FaInstagram /></a>
              </h4>
            </div>
          </div>
          <span>{tour.price}</span>
        </div>
      )}
    </div>
  );
};

export default Tour;
