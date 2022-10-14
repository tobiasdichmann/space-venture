import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../styles/admin/admintoursedit.scss";

// API-CALL
import { getTourById, editTour } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";
import Popup from "../../Popup";

// RTE - RICH TEXT EDITOR - WYSIWYG
import Editor from "ckeditor5-custom-build/build/ckeditor";
import { CKEditor } from "@ckeditor/ckeditor5-react";

const AdminToursEdit = () => {
  // Get the ID (from the url) of the tour you want to edit (is a parameter - check in App.js)
  const { tourID } = useParams();
  const [tour, setTour] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for status on update
  const [message, setMessage] = useState();

  // State for content from the texteditor (Used by textarea)
  const [editortxtContent, setEditortxtContent] = useState();

  // Get tour (fra id) that you want to edit
  useEffect(() => {
    setLoading(true);

    getTourById(tourID)
      .then((data) => {
        setTour(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setTour();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    let edittour = new FormData(e.target);

    editTour(edittour, tourID)
      .then((data) => {
        setMessage("Turen '" + data.rettet.title + "' er blevet rettet");
        setError(false);
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

        {message && (
          <Popup
            title="Tour er rettet"
            content={message}
            setMessage={setMessage}
          />
        )}

        {tour && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="destination">Detination</label>
            <input
              type="text"
              name="destination"
              id="destination"
              defaultValue={tour.destination}
              required
            ></input>

            <label htmlFor="title">Titel</label>
            <input
              type="text"
              name="title"
              id="title"
              defaultValue={tour.title}
              required
            />

            <label htmlFor="content">Beskrivelse</label>
            <textarea
              name="content"
              defaultValue={editortxtContent}
              style={{ display: "none" }}
              required
            ></textarea>
            <CKEditor
              editor={Editor}
              data={tour.content}
              onChange={(event, editor) => {
                setEditortxtContent(editor.getData());
              }}
              onReady={(editor) => {
                setEditortxtContent(editor.getData());
              }}
            />

            <label htmlFor="traveltime">Flyvetid</label>
            <input
              type="text"
              name="traveltime"
              id="traveltime"
              defaultValue={tour.traveltime}
              required
            />

            <label htmlFor="distance">Afstand fra jorden</label>
            <input
              type="text"
              name="distance"
              id="distance"
              defaultValue={tour.distance}
              required
            />

            <label htmlFor="price">Pris</label>
            <input
              type="text"
              name="price"
              id="price"
              defaultValue={tour.price}
              required
            />

            <label htmlFor="image1">Billede nr. 1</label>
            <br />
            <img
              src={"http://localhost:4444/images/tours/" + tour.image1}
              alt="image1"
            />
            <input type="file" name="image1" id="image1" />

            <label htmlFor="image2">Billede nr. 2</label>
            <br />
            <img
              src={"http://localhost:4444/images/tours/" + tour.image2}
              alt="image2"
            />
            <input type="file" name="image2" id="image2" />

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

export default AdminToursEdit;
