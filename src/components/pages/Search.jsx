import React, { useState, useEffect } from 'react'
import '../styles/searchtours.scss';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import parser from 'html-react-parser';

// API-CALL
import { getToursSearch } from '../../helpers/api';

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";
import Pagination from "../Pagination";

const Search = () => {
  const [tours, setTours] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // On click "Læs mere" - Save id on the clicked tour
  const [showTour, setShowTour] = useState();

  // State for pagination
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [currentPage, setCurrentPage] = useState(0); // 0 = page 1

  let { q } = useParams();

  useEffect(() => {
    setLoading(true)

    getToursSearch(q)
      .then((data) => {
        setTours(data)
        setError(false)
      })
      .catch((err) => {
        setTours()
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [q])

  // Change 'page' - gets the page, it must show now
  const turnPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der er sket en fejl, da du prøvede at rette denne tour</p>
        </ErrorComp>
      )}

      {tours && (
        <div id="searchTours">
          <div id="searchToursContainer">
            {
              tours.map((t, i) => (
                <div key={t._id} className="search-cards-container">
                  <img
                    src={"http://localhost:4444/images/tours/" + t.image1}
                    alt={"Billede fra:" + t.destination}
                  />

                  <div className="search-cards-content">
                    <h4>{t.title}</h4>

                    <p>{parser(t.content)}</p>

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
  )
}

export default Search