import React, { useState, useEffect } from 'react'
import '../styles/gallery.scss';

// COMPONENTS
import Loader from "../Loader";
import ErrorComp from "../ErrorComp";

// IMAGES
import Image1 from '../../assets/img/galleri/1.jpg';
import Image2 from '../../assets/img/galleri/2.jpg';
import Image3 from '../../assets/img/galleri/3.jpg';
import Image4 from '../../assets/img/galleri/4.jpg';
import Image5 from '../../assets/img/galleri/5.jpg';
import Image6 from '../../assets/img/galleri/6.jpg';
import Image7 from '../../assets/img/galleri/7.jpg';
import Image8 from '../../assets/img/galleri/8.jpg';
import Image9 from '../../assets/img/galleri/9.jpg';
import Image10 from '../../assets/img/galleri/10.jpg';
import Image11 from '../../assets/img/galleri/11.jpg';
import Image12 from '../../assets/img/galleri/12.jpg';

const Rumfærgen = () => {
  useEffect(() => {
    document.title = 'Galleri';
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div id='gallery'>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at se vores ture</p>
        </ErrorComp>
      )}

      <div className="cover-image-container">
        <img src="assets/img/banner-spaceship.jpg" alt="Rumfærgen banner" />
        <h2>Galleri</h2>
      </div>

      <div className="gallery-content">
        <img src={Image1} alt="Billede nr. 1" />
        <img src={Image2} alt="Billede nr. 2" />
        <img src={Image3} alt="Billede nr. 3" />
        <img src={Image4} alt="Billede nr. 4" />
        <img src={Image5} alt="Billede nr. 5" />
        <img src={Image6} alt="Billede nr. 6" />
        <img src={Image7} alt="Billede nr. 7" />
        <img src={Image8} alt="Billede nr. 8" />
        <img src={Image9} alt="Billede nr. 9" />
        <img src={Image10} alt="Billede nr. 10" />
        <img src={Image11} alt="Billede nr. 11" />
        <img src={Image12} alt="Billede nr. 12" />
      </div>
    </div>
  )
}

export default Rumfærgen