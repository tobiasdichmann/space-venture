// Inspired of https://www.w3schools.com/howto/howto_js_slideshow.asp
import React, { useState, useEffect } from "react";
import "./styles/slider.scss";

// API-CALL
import { getBanner } from '../helpers/api';

// COMPONENTS
import Loader from "./Loader";
import ErrorComp from "./ErrorComp";

const Slider = () => {

  // Image-array (List of images) from parent
  const [banner, setBanner] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [slideIndex, setSlideIndex] = useState(); // First img has index 0

  useEffect(() => {
    setLoading(true);

    getBanner()
      .then((data) => {
        if (data) {
          setBanner(data);
          setError(false);
          setSlideIndex(0)
        } else {
          setBanner();
          setError(true);
        }
      })
      .finally(setLoading(false));
  }, []);

  let t; // t is for controlling setTimeout

  useEffect(() => {
    if (banner) {
      let i; // i is our counter in loops
      let slides = document.getElementsByClassName("mySlides"); // List with all images
      let dots = document.getElementsByClassName("dot"); // List with all dots

      // Prevents changing images - which should be displayed - as -1 -2 etc.
      if (slideIndex >= slides.length) {
        setSlideIndex(0);
        return; // Break out of useEffect and start over with the new state - 0
      }

      // Prevents slide images - which must be displayed - from becoming larger than the number of images
      if (slideIndex < 0) {
        setSlideIndex(slides.length - 1); // Number of pictures - 1 > 3 pictures then the last picture is no. 2
        return; // Break out of useEffect and start over with the new state - 0
      }

      // Turn off all images and dots (There is only 1 active)
      for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none"; // Hide all images
      }

      for (i = 0; i < dots.length; i++) {
        dots[i].classList.remove("active");
      }

      // Turn on the slide and dot that should be displayed now
      slides[slideIndex].style.display = "block";
      dots[slideIndex].classList.add("active");

      t = setTimeout(() => setSlideIndex(slideIndex + 1), 3000);
    }

    return () => {
      clearTimeout(t);
    };
  }, [slideIndex]);

  return (
    <div>
      {loading && <Loader />}

      {error && (
        <ErrorComp>
          <p>Der skete en fejl, da du prøvede at se vores ture</p>
        </ErrorComp>
      )}

      {banner &&
        <div className="slider-container">

          {banner.map((s, i) => (
            <div className="mySlides fade" key={s + i}>
              <img src={"http://localhost:4444/images/banner/" + s.image} alt="Slider Images" />
              <div className="slider-txt">
                <h2>{s.title}</h2>
                <h3>{s.content}</h3>
              </div>
            </div>
          ))}

          <div className="dots-container">
            {banner.map((s, i) =>
              <span className="dot" onClick={() => setSlideIndex(i)} key={"dot" + i}></span>
            )
            }
          </div>
        </div>
      }
    </div >
  );
};

export default Slider;
