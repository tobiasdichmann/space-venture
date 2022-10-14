import React, { useState, useEffect } from "react";
import "../../styles/admin/adminnewsletter.scss";

// API-CALL
import { getSubscriptions, deleteSubscriptions } from "../../../helpers/api";

// COMPONENTS
import Loader from "../../Loader";
import ErrorComp from "../../ErrorComp";

// ICONS
import { AiOutlineDelete } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";

const AdminNewsletter = () => {
  const [subscriped, setSubscriped] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for handling if a tour is deleted - or if an error occurred
  const [subscribeDeleted, setSubscribeDeleted] = useState();

  // Call api and send data (or error) in state
  useEffect(() => {
    setLoading(true);

    getSubscriptions()
      .then((data) => {
        setSubscriped(data);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSubscriped();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [subscribeDeleted]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleDelete = (ID, email) => {
    if (window.confirm("Er du sikker på du vil slette mailen: " + email + " fra vores system?")) {
      setLoading(true);

      deleteSubscriptions(ID)
        .then((data) => {
          setSubscribeDeleted([true, ID]);
        })
        .catch((err) => {
          console.log(err);
          setSubscribeDeleted(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="adminNewsletter">
      <div id="adminNewsletterContent">

        {
          // If api-call is loading - Wait for data or error
          loading && <Loader />
        }

        {
          // If there is an error from the api
          error && (
            <ErrorComp>
              <p>Der kunne ikke hentes data fra API'et</p>
            </ErrorComp>
          )
        }

        {subscriped && (
          <div>
            <h1>Newsletter Subscriptions</h1>
            {subscriped.map((n) => (
              <div key={n._id} className="newsletter-gr">
                <div>
                  <h2>{n.email}</h2>
                </div>
                <div>
                  <AiOutlineDelete
                    size="2em"
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(n._id, n.email)}
                  />
                  <a href={"mailto:" + n.email}>
                    <BiMailSend
                      size="2em"
                      color="green"
                      cursor="pointer"
                      title={"Send en mail til: " + n.email}
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

export default AdminNewsletter;
