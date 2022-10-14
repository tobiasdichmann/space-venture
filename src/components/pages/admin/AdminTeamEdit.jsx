import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/admin/admingalleryedit.scss";

// API-CALL
import { getTeamMemberById, editTeamMember } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

const AdminGalleryEdit = () => {
  // Get the ID (from the url) of the teammate you want to edit (is a parameter - check in App.js)
  const { teammemberID } = useParams();

  const [team, setTeam] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  // Get gallery (from id) that you want to edit
  useEffect(() => {
    setLoading(true);

    getTeamMemberById(teammemberID)
      .then((data) => {
        setTeam(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setTeam();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let editteammember = new FormData(e.target);

    editTeamMember(editteammember, teammemberID)
      .then((data) => {
        setMessage("Din teammate '" + data.rettet.name + "' er blevet rettet");
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
            title="Teammate er rettet"
            content={message}
            setMessage={setMessage}
          />
        )}

        {team && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Navn</label>
            <input
              type="text"
              name="name"
              id="name"
              defaultValue={team.name}
              required
            />

            <label htmlFor="role">Rolle</label>
            <input
              type="text"
              name="role"
              id="role"
              defaultValue={team.role}
              required
            />

            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              name="email"
              id="email"
              defaultValue={team.email}
              required
            />

            <label htmlFor="phone">Mobilnummer</label>
            <input
              type="phone"
              name="phone"
              id="phone"
              defaultValue={team.phone}
              required
            />

            <label htmlFor="image">Billede</label>
            <br />
            <img
              src={"http://localhost:4444/images/team/" + team.image}
              alt={"Billede af: " + team.name}
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
