import React, { useState, useEffect } from "react";
import "../../styles/admin/adminteam.scss";
import { Link } from "react-router-dom";

// API-CALL
import { getTeam, deleteTeamMember } from "../../../helpers/api";

// COMPONENTS
import Loading from "../../Loader";
import ErrorComp from "../../ErrorComp";

// ICONS
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { GrAdd } from "react-icons/gr";

const AdminGallery = () => {
  const [team, setTeam] = useState(); // Data/Text that the user can edit
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // State for handling if a tour is deleted - or if an error occurred
  const [teamMemberDeleted, setTeamMemberDeleted] = useState();

  // Call api and send data (or error) in state
  useEffect(() => {
    setLoading(true);

    getTeam()
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
  }, [teamMemberDeleted]); // An empty [] dependencylist means the useEffect only runs once -> When window is loading for the first time (NOT on re-render)

  const handleDelete = (ID, name) => {
    if (window.confirm("Er du sikker på du vil slette din teammate: " + name + "?")) {
      setLoading(true);

      deleteTeamMember(ID)
        .then((data) => {
          setTeamMemberDeleted([true, ID]);
        })
        .catch((err) => {
          setTeamMemberDeleted(false);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <div id="adminTeam">
      <div id="adminTeamContent">
        <Link to="/admin/team/createteammember" id="addTeam" title="Tilføj en ny teammate">
          <GrAdd />
        </Link>

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

        {team && (
          <div>
            <h1>Galleri billeder</h1>
            {team.map((t) => (
              <div key={t._id} className="team-gr">
                <div>
                  <img src={"http://localhost:4444/images/team/" + t.image} alt={"Billede af: " + t.name} />
                  <h2>{t.name}</h2>
                  <h3>{t.role}</h3>
                  <h4>{t.email}</h4>
                  <h4>{t.phone}</h4>
                </div>
                <div>
                  <AiOutlineDelete
                    size="2em"
                    color="red"
                    cursor="pointer"
                    onClick={() => handleDelete(t._id, t.name)}
                  />
                  <Link to={"/admin/team/editteammember/" + t._id}>
                    <AiOutlineEdit
                      size="2em"
                      color="green"
                      cursor="pointer"
                      title="Ret denne profil"
                    />
                  </Link>
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

export default AdminGallery;
