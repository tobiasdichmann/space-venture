// Inspired of https://www.youtube.com/watch?v=MBaw_6cPmAw
import React from "react";
import "./styles/popup.scss";

// Must receive title, content, setMessage (state in parent)
const Popup = (props) => {
  return (
    <div className="popup-bg-overlay">
      <div className="popup">
        <div className="header">
          <div className="title">{props.title}</div>

          {/* Call state in parent and empty message so that it disappears */}
          <button onClick={() => props.setMessage(false)} className="close">
            &times;
          </button>
        </div>

        <div className="body">
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
};

export default Popup;
