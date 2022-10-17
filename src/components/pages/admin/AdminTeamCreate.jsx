import React, { useState, useEffect } from "react";
import "../../styles/admin/adminteamcreate.scss";

// API-CALL
import { createTeamMember } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

const AdminToursCreate = () => {
  useEffect(() => {
    document.title = 'Team';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let newteammember = new FormData(e.target);

    createTeamMember(newteammember)
      .then((data) => {
        setMessage("Din nye teammate: " + data.oprettet.name + " er oprettet");
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
    <div id="adminTeamCreate">
      <div id="adminTeamCreateContainer">
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
          <label htmlFor="name">Navn</label>
          <input type="text" name="name" id="name" required />

          <label htmlFor="role">Rolle</label>
          <input type="text" name="role" id="role" required />

          <label htmlFor="email">E-mail</label>
          <input type="email" name="email" id="email" required />

          <label htmlFor="phone">Mobilnummer</label>
          <input type="phone" name="phone" id="phone" required />

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
