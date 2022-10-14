import React, { useState, useEffect } from "react";
import "../../styles/admin/admincontact.scss";

// API-CALL
import { getMessage, deleteMessage } from "../../../helpers/api";

// COMPONENTS
import Loading from "../../Loader";
import ErrorComp from "../../ErrorComp";

// ICONS
import { AiOutlineDelete } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";

const AdminTours = () => {
  const [userMessage, setUserMessage] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for handling if a contact is deleted - or if an error occurred
  const [messageDeleted, setMessageDeleted] = useState();

  // Call api and send data (or error) in state
  useEffect(() => {
    setLoading(true);

    getMessage()
      .then((data) => {
        setUserMessage(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setUserMessage();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [messageDeleted]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleDelete = (ID, name) => {
    if (window.confirm("Er du sikker på du vil slette beskeden fra: " + name + "?")) {
      setLoading(true);

      deleteMessage(ID)
        .then((data) => {
          setMessageDeleted([true, ID]);
        })
        .catch((err) => {
          console.log(err);
          setMessageDeleted(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="adminContact">
      <div id="adminContactContent">

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

        {userMessage && (
          <div>
            <h1>Se dine beskeder her!</h1>
            {userMessage.map((m) => (
              <div key={m._id} className="contact-gr">
                <div className="message-gr">
                  <div className="message-info">
                    <table>
                      <tr>
                        <tb><h2>{m.name}</h2></tb>
                      </tr>
                      <tr>
                        <tb><h3>{m.email}</h3></tb>
                      </tr>
                      <tr>
                        <tb><h4>{m.phone}</h4></tb>
                      </tr>
                      <tr>
                        <tb><h5>
                          {new Date(m.received).toLocaleDateString("da-DK", {
                            year: "numeric",
                            month: "long",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit"
                          })}
                        </h5></tb>
                      </tr>
                    </table>
                  </div>
                  <p>{m.message}</p>
                </div>
                <div>
                  <AiOutlineDelete
                    size="2em"
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(m._id, m.name)}
                  />
                  <a href={"mailto:" + m.email}>
                    <BiMailSend
                      size="2em"
                      color="green"
                      cursor="pointer"
                      title={"Send en mail til: " + m.name}
                    />
                  </a>
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
