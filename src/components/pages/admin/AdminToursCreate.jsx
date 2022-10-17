import React, { useState, useEffect } from "react";
import "../../styles/admin/admintourscreate.scss";

// API-CALL
import { createTour } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

// RTE - RICH TEXT EDITOR - WYSIWYG
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const AdminToursCreate = () => {
  useEffect(() => {
    document.title = 'Ture';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  // State for content from the texteditor (Used by textarea)
  const [editortxtContent, setEditortxtContent] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let newtour = new FormData(e.target);

    createTour(newtour)
      .then((data) => {
        setMessage("Ny tour er oprettet med titlen: " + data.oprettet.title);
        setError(false);
        e.target.reset(); // Clear form
        setEditortxtContent(""); // Clear state - Clear CKEditor
      })
      .catch((err) => {
        setError(true);
        setMessage(); // Clear message
      })
      .finally(setLoading(false));
  };

  return (
    <div id="adminToursCreate">
      <div id="adminToursCreateContainer">
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
          <label htmlFor="destination">Destination</label>
          <input type="text" name="destination" id="destination" required />

          <label htmlFor="title">Titel</label>
          <input type="text" name="title" id="title" required />

          <textarea
            name="content"
            id="content"
            defaultValue={editortxtContent}
            required
            style={{ display: "none" }}
          ></textarea>
          <label htmlFor="content">Beskrivelse</label>
          <CKEditor
            editor={Editor}
            data={editortxtContent}
            onChange={(event, editor) => {
              setEditortxtContent(editor.getData());
            }}
          />

          <label htmlFor="traveltime">Flyvetid</label>
          <input
            type="text"
            name="traveltime"
            id="traveltime"
            placeholder="ca. 45 timer"
            required
          />

          <label htmlFor="distance">Afstand fra jorden</label>
          <input
            type="text"
            name="distance"
            id="distance"
            placeholder="384.400km"
            required
          />

          <label htmlFor="price">Pris</label>
          <input type="text" name="price" id="price" placeholder="1.5 mio" required />

          <label htmlFor="image1">Billede nr. 1</label>
          <input type="file" name="image1" id="image1" required />

          <label htmlFor="image2">Billede nr. 2</label>
          <input type="file" name="image2" id="image2" required />

          <button type="submit" className="saveBtn">
            Opret ny tour
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminToursCreate;
