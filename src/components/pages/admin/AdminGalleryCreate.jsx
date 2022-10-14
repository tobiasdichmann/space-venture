import React, { useState } from "react";
import "../../styles/admin/admingallerycreate.scss";

// API-CALL
import { createGallery } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

const AdminToursCreate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let newgallery = new FormData(e.target);

    createGallery(newgallery)
      .then((data) => {
        setMessage("Nyt billede er oprettet med billedteksten: " + data.oprettet.imagetext);
        setError(false);
        e.target.reset(); // Clear form
      })
      .catch((err) => {
        setError(true);
        setMessage(); // Clear message
      })
      .finally(setLoading(false));
  };

  return (
    <div id="adminGalleryCreate">
      <div id="adminGalleryCreateContainer">
        {loading && <Loader />}

        {error && (
          <ErrorComp>
            <p>Der kunne ikke hentes data fra API'et</p>
          </ErrorComp>
        )}

        {message && (
          <Popup
            title="Ny er oprettet"
            content={message}
            setMessage={setMessage}
          />
        )}

        <form onSubmit={handleSubmit}>
          <label htmlFor="imagetext">Billedetekst</label>
          <input type="text" name="imagetext" id="imagetext" />

          <label htmlFor="image">Billede</label>
          <input type="file" name="image" id="image" required />

          <button type="submit" className="saveBtn">
            Opret et nyt billede
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminToursCreate;
