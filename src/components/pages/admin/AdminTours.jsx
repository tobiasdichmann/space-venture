import React, { useState, useEffect } from "react";
import "../../styles/admin/admintours.scss";
import { Link } from "react-router-dom";
import parser from 'html-react-parser';

// API-CALL
import { getTours, deleteTour } from "../../../helpers/api";

// COMPONENTS
import Loading from "../../Loader";
import ErrorComp from "../../ErrorComp";

// ICONS
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const AdminTours = () => {
  useEffect(() => {
    document.title = 'Ture';
  });

  const [tours, setTours] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for handling if a tour is deleted - or if an error occurred
  const [tourDeleted, setTourDeleted] = useState();

  // Call api and send data (or error) in state
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
  }, [tourDeleted]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleDelete = (ID, destination) => {
    if (window.confirm("Er du sikker på du vil slette turen til: " + destination + "?")) {
      setLoading(true);

      deleteTour(ID)
        .then((data) => {
          setTourDeleted([true, ID]);
        })
        .catch((err) => {
          setTourDeleted(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="adminTours">
      <div id="adminToursContent">
        <Link to="/admin/tours/createtours" id="addTour" title="Lav en ny tur">
          <GrAdd />
        </Link>

        {
          // If api-call is loading - Wait for data or error
          loading && <Loading />
        }

        {
          // If there is an error from the api
          error && (
            <ErrorComp>
              <p>Der kunne ikke hentes data fra API'et</p>
            </ErrorComp>
          )
        }

        {tours && (
          <div>
            <h1>Admin Tours</h1>
            {tours.map((t) => (
              <div key={t._id} className="tours-gr">
                <div>
                  <h2>{t.destination}</h2>
                  <p>{parser(t.content)}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    size="2em"
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(t._id, t.destination)}
                  />
                  <Link to={"/admin/tours/edittours/" + t._id}>
                    <AiOutlineEdit
                      size="2em"
                      color="green"
                      cursor="pointer"
                      title="Ret i denne tur"
                    />
                  </Link>
                </div>
                <hr />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminTours;
