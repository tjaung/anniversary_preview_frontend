import React, { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import "./letter.css";

import { GiLoveLetter } from "react-icons/gi";

const Letter = () => {
  const [isVisible, setIsVisible] = useState(false);
  // const [animationClass, setAnimationClass] = useState("fade-in-top");

  const parchmentRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const scrollHeight = () => {
      if (parchmentRef.current && containerRef.current) {
        parchmentRef.current.style.height = `${containerRef.current.offsetHeight}px`;
      }
    };

    if (isVisible) {
      scrollHeight();
      window.addEventListener("resize", scrollHeight);
    }

    // Cleanup event listener on component unmount or visibility change
    return () => {
      window.removeEventListener("resize", scrollHeight);
    };
  }, [isVisible]);

  const toggleVisibility = () => {
    // setAnimationClass("fade-out-top");
    setIsVisible(!isVisible);
  };

  return ReactDOM.createPortal(
    <div className="" onClick={toggleVisibility}>
      <button className="toggle-letter" onClick={toggleVisibility}>
        <GiLoveLetter color="yellow" fontSize="2rem" />
      </button>
      {isVisible && (
        <div className={`letter-container`}>
          <main>
            <div id="parchment" ref={parchmentRef}></div>
            <div id="contain" ref={containerRef}>
              <p className="inkTitle">Anniversary Letter</p>
              <p className="content">
                This is a cheesy letter I wrote. The letter is toggled on with
                the glowing button you clicked/touched, and untoggled by
                clicking/touching the letter. The component is sent to a modal
                root with ReactDOM. I thought that would be an easy way to do it
                to overlay it over the whole page. I recognize that there are
                probably better solutions, but I had a deadline of my
                anniversary, so this method had to do.
              </p>
              <div id="signature">
                signed,
                <br />
                Tim
              </div>
            </div>
          </main>

          <svg>
            <filter id="wavy2">
              <feTurbulence
                x="0"
                y="0"
                baseFrequency="0.02"
                numOctaves="5"
                seed="1"
              />
              <feDisplacementMap in="SourceGraphic" scale="20" />
            </filter>
          </svg>
        </div>
      )}
    </div>,
    document.getElementById("modal-root") // This is where the portal points to
  );
};

export default Letter;
