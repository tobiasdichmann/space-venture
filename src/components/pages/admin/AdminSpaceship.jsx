import React, { useState, useEffect } from "react";
import "../../styles/admin/adminspacecraft.scss";

// API-CALL
import { getSpacecraft, editSpacecraft } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

// RTE - RICH TEXT EDITOR - WYSIWYG
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const AdminSpacecraft = () => {
  const [spacecraft, setSpacecraft] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  // State for content from the texteditor (Used by textarea)
  const [editortxt, setEditortxt] = useState();

  // Call api and send data (or error) in state
  useEffect(() => {
    setLoading(true);
    getSpacecraft()
      .then((data) => {
        setSpacecraft(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSpacecraft();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleSubmit = (e) => {
    e.preventDefault(); // Avoid reload of component ( = loss of data)

    // Create form content to form data
    let spacecraftedit = new FormData(e.target);

    editSpacecraft(spacecraftedit)
      .then((data) => {
        setMessage("Spacecraft er nu succesfuldt rettet!");
      })
      .catch((err) => {
        setMessage("Der er sket en fejl... Prøv igen senere :-)");
      });
  };

  return (
    <div id="adminSpacecraft">
      <div id="adminSpacecraftContainer">
        {
          // If api-call is loading - Wait for data or error
          loading && <Loader />
        }

        {
          // If there is an error from the api
          error && (
            <ErrorComp>
              <p>Der opstod en fejl, da du prøvede at rette denne tour</p>
            </ErrorComp>
          )
        }

        {message && (
          <Popup
            title="Spacecraft er rettet"
            content={message}
            setMessage={setMessage}
          />
        )}

        {
          // If there are data from the api in state
          spacecraft && (
            <form onSubmit={handleSubmit}>
              <h1>Ret indhold i Rumfærgen</h1>
              <label htmlFor="title">Titel</label> <br />
              <input
                type="text"
                name="title"
                id="title"
                defaultValue={spacecraft.title}
              />
              <br />
              <label htmlFor="content">Beskrivelse</label> <br />
              {/* Textarea = display: none; - DO NOT DELETE! */}
              <textarea
                name="content"
                id="content"
                defaultValue={editortxt}
                style={{ display: "none" }}
              ></textarea>
              <CKEditor
                editor={Editor}
                data={spacecraft.content}
                onChange={(event, editor) => {
                  setEditortxt(editor.getData());
                }}
                onReady={(editor) => {
                  setEditortxt(editor.getData());
                }}
              />
              <br />
              <label htmlFor="image">Billede</label>
              <img src={"http://localhost:4444/images/spacecraft/" + spacecraft.image} alt="Rumfærgen billede" />
              <input type="file" name="image" id="image" />

              <button type="submit" className="saveBtn">
                Gem Rettelserne
              </button>
            </form>
          )
        }
      </div>
    </div>
  );
};

export default AdminSpacecraft;
