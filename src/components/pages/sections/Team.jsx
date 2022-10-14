import React, { useState, useEffect } from 'react'
import '../../styles/sections/team.scss'

// API-CALL
import { getTeam } from '../../../helpers/api';

// COMPONENTS
import Loader from '../../Loader';
import ErrorComp from '../../ErrorComp';

const Team = () => {
    const [team, setTeam] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);

        getTeam()
            .then((data) => {
                if (data) {
                    setTeam(data);
                    setError(false);
                } else {
                    setTeam();
                    setError(true);
                }
            })
            .finally(setLoading(false));
    }, []);

    return (
        <div id='team'>
            {loading && <Loader />}

            {error && (
                <ErrorComp>
                    <p>Der er sket en fejl, da du prøvede at rette denne tour</p>
                </ErrorComp>
            )}
            <h2>Vores team</h2>
            <div id='teamContainer'>
                {team && (
                    team.map((t) => (
                        <div key={t._id} className="cards-container">
                            <img
                                src={"http://localhost:4444/images/team/" + t.image}
                                alt={"Billede af" + t.name}
                            />

                            <div className="cards-container-content">
                                <h4>{t.name}</h4>

                                <h5>{t.role}</h5>

                                <p>{t.phone}</p>
                            </div>
                        </div>
                    ))
                )
                }
            </div>
        </div>
    )
}

export default Team