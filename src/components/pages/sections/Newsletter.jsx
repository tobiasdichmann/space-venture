import React, { useState } from 'react'
import '../../styles/sections/newsletter.scss';

// API-CALL
import { subscribeNews } from '../../../helpers/api';

// COMPONENTS
import Loader from '../../Loader';
import ErrorComp from '../../ErrorComp';

// IMAGES
import NesletterImage from '../../../assets/img/newsmail-bg.jpg';

const Newsletter = () => {
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  // Handle Subscription
  const handleSubscription = e => {
    e.preventDefault();

    setLoading(true)

    // Get content from my form and send it to the api
    let formData = new FormData(e.target)

    subscribeNews(formData)
      .then((data) => {
        setSubscribed(true)
        setError(false)
      })
      .catch((err) => {
        setSubscribed(false)
        setError(true)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <div id='newsletter'>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at tilmelde dig nyhedsbrevet</p>
        </ErrorComp>
      )}

      {subscribed &&
        <>
          <img src={NesletterImage} alt="Newsletter image" />
          <div className="newsletter-content">
            <h2>Tak!</h2>
            <h4>Din email er nu succesfuldt tilknyttet vores nyhedsbrev</h4>
          </div>
        </>
      }

      {/* If not = Show the form */}
      {!subscribed &&
        <>
          <img src={NesletterImage} alt="Newsletter image" />
          <div className="newsletter-content">
            <h2>Tilmeld dig og få 25% rabat</h2>
            <p>Tilmeld dig vores nyhedsbrev og få 25% rabat på din første tur!</p>
            <form onSubmit={handleSubscription}>
              <input type="email" name='email' placeholder='Din E-mail' required />
              <button type='submit'>Tilmeld</button>
            </form>
          </div>
        </>
      }
    </div>
  )
}

export default Newsletter