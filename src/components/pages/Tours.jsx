import React, { useState, useEffect } from "react";
import "../styles/tours.scss";
import parser from 'html-react-parser';
import { Link } from "react-router-dom";

// API-CALL
import { getTours } from "../../helpers/api";

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";
import Pagination from "../Pagination";

// IMAGES
import BannerTours from '../../assets/img/banner-ture.jpg';

const Tours = () => {
  useEffect(() => {
    document.title = 'Ture';
  });

  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // On click "Læs mere" - Save id on the clicked tour
  const [showTour, setShowTour] = useState();

  // State til pagination
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0); // 0 = page 1

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

  // Change 'page' - gets the page, it must show now
  const turnPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at se vores ture</p>
        </ErrorComp>
      )}

      {tours && (
        <div id="tours">
          <div className="cover-image-container">
            <img src={BannerTours} alt="Cover Image" />
            <h2>Ture</h2>
          </div>
          <div id="toursContainer">

            {
              // 0,3 ... 3,6 ... 6,9
              tours.slice((currentPage * itemsPerPage), (currentPage * itemsPerPage) + itemsPerPage).map((t, i) => (
                <div key={t._id} className="cards-container">
                  <img
                    src={"http://localhost:4444/images/tours/" + t.image1}
                    alt={"Billede fra:" + t.destination}
                  />

                  <div className="cards-content">
                    <h4>{t.title}</h4>

                    {parser(t.content)}

                    <Link to={"/tours/tour/" + t._id}>
                      <button>
                        Læs mere
                      </button>
                    </Link>

                  </div>
                  <span>{t.price}</span>
                </div>
              ))}
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              itemsOfPages={Math.ceil(tours.length / itemsPerPage)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Tours;
