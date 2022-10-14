import React, { useState, useEffect } from "react";
import "../styles/safety.scss";
import parser from 'html-react-parser';

// API-CALL
import { getSafety } from "../../helpers/api";

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";

// IMAGES
import BannerSafety from '../../assets/img/banner-ture.jpg';

const Tours = () => {
  const [safety, setSafety] = useState()
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Call api and get safety
  useEffect(() => {
    setLoading(true);

    getSafety()
      .then((data) => {
        setSafety(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSafety();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at se vores ture</p>
        </ErrorComp>
      )}

      {safety && (
        <div id="safety">
          <div className="cover-image-container">
            <img src={BannerSafety} alt="Cover Image" />
            <h2>Sikkerhed</h2>
          </div>
          <div id="safetyContainer">
            <div className="safety-content">
              <h3>{safety.title}</h3>
              <p>{parser(safety.content)}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
