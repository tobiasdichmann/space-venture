import React, { useState, useEffect } from "react";
import "../../styles/admin/admingallery.scss";
import { Link } from "react-router-dom";

// API-CALL
import { getGallery, deleteGallery } from "../../../helpers/api";

// COMPONENTS
import Loading from "../../Loader";
import ErrorComp from "../../ErrorComp";

// ICONS
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const AdminGallery = () => {
  const [gallery, setGallery] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for handling if a tour is deleted - or if an error occurred
  const [galleryDeleted, setGalleryDeleted] = useState();

  // Call api and send data (or error) in state
  useEffect(() => {
    setLoading(true);

    getGallery()
      .then((data) => {
        setGallery(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setGallery();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [galleryDeleted]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleDelete = (ID, imagetext) => {
    if (window.confirm("Er du sikker på du vil slette billedet med billedteksten: " + imagetext + "?")) {
      setLoading(true);

      deleteGallery(ID)
        .then((data) => {
          setGalleryDeleted([true, ID]);
        })
        .catch((err) => {
          console.log(err);
          setGalleryDeleted(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="adminGallery">
      <div id="adminGalleryContent">
        <Link to="/admin/gallery/creategallery" id="addGallery" title="Tilføj et nyt billede">
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

        {gallery && (
          <div>
            <h1>Galleri billeder</h1>
            {gallery.map((g) => (
              <div key={g._id} className="gallery-gr">
                <div>
                  <img src={"http://localhost:4444/images/gallery/" + g.image} alt={g.imagetext} />
                </div>
                <div>
                  <AiOutlineDelete
                    size="2em"
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(g._id, g.imagetext)}
                  />
                  <Link to={"/admin/gallery/editgallery/" + g._id}>
                    <AiOutlineEdit
                      size="2em"
                      color="green"
                      cursor="pointer"
                      title="Skift dette billede ud"
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

export default AdminGallery;
