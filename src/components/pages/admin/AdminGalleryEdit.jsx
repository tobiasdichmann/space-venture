import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/admin/admingalleryedit.scss";

// API-CALL
import { getGalleryById, editGallery } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

const AdminGalleryEdit = () => {
  // Get the ID (from the url) of the gallery you want to edit (is a parameter - check in App.js)
  const { galleryID } = useParams();

  const [gallery, setGallery] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  // Get gallery (from id) that you want to edit
  useEffect(() => {
    setLoading(true);

    getGalleryById(galleryID)
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
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let editgallery = new FormData(e.target);

    editGallery(editgallery, galleryID)
      .then((data) => {
        setMessage("Billedet med billedteksten '" + data.rettet.imagetext + "' er blevet rettet");
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setMessage(); // Clear message
      })
      .finally(setLoading(false));
  };

  return (
    <div id="adminGalleryEdit">
      <div id="adminGalleryEditContainer">
        {loading && <Loader />}

        {message && (
          <Popup
            title="Billede er rettet"
            content={message}
            setMessage={setMessage}
          />
        )}

        {gallery && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="imagetext">Billedetekst</label>
            <input
              type="text"
              name="imagetext"
              id="imagetext"
              defaultValue={gallery.imagetext}
              required
            />

            <label htmlFor="image">Billede</label>
            <br />
            <img
              src={"http://localhost:4444/images/gallery/" + gallery.image}
              alt={gallery.imagetext}
            />
            <input type="file" name="image" id="image" />

            <button type="submit" className="saveBtn">
              Edit tour
            </button>
          </form>
        )}

        {error && (
          <ErrorComp>
            <p>Der er sket en fejl, da du prøvede at rette denne tour</p>
          </ErrorComp>
        )}
      </div>
    </div>
  );
};

export default AdminGalleryEdit;
