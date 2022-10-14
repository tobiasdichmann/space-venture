import React, { useState, useEffect } from 'react'
import '../styles/contact.scss';

// API-CALL
import { sendMessage } from '../../helpers/api';

// COMPONENTS
import Loader from '../Loader';
import ErrorComp from '../ErrorComp';
import Map from '../Map';

const Contact = () => {
  const [userMessage, setUserMessage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle Contact
  const handleContacted = e => {
    e.preventDefault();

    setLoading(true)

    // Get content from my form and send it to the api
    let formData = new FormData(e.target)

    sendMessage(formData)
      .then((data) => {
        setUserMessage(true)
        setError(false)
      })
      .catch((err) => {
        setUserMessage(false)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div id='contact'>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at tilmelde dig nyhedsbrevet</p>
        </ErrorComp>
      )}

      <Map />

      {userMessage &&
        <>
          <div className="contact-txt">
            <h3>Kontakt</h3>
            <hr />
            <p>Du har sendt os en besked til os - Vi vil vende tilbage hurtigst muligt</p>
          </div>
          <form onSubmit={handleContacted}>
            <input type="text" name='name' placeholder='Dit navn' required />
            <input type="email" name='email' placeholder='E-mail' required />
            <input type="phone" name='phone' placeholder='Tlf' required />

            <textarea name="message" placeholder='Besked'></textarea>

            <button type='submit'>Send</button>
          </form>
        </>
      }

      {!userMessage &&
        <>
          <div className="contact-txt">
            <h3>Kontakt</h3>
            <hr />
            <p>Skulle du sidde med et spørgsmål eller to, så skriv endelig til os og vi vil kontakte dig hurstigst muligt.</p>
          </div>
          <form onSubmit={handleContacted}>
            <input type="text" name='name' placeholder='Dit navn' required />
            <input type="email" name='email' placeholder='E-mail' required />
            <input type="phone" name='phone' placeholder='Tlf' required />
            <textarea name="message" placeholder='Besked'></textarea>

            <button type='submit'>Send</button>
          </form>
        </>
      }
    </div>
  )
}

export default Contact