import React, { useEffect } from "react";
import "./loadingBubble.css";

const LoadingBubble = (props) => {
  const setLoadingDone = props.setLoadingDone;

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingDone(true);
    }, 400);

    return () => clearTimeout(timer);
  }, [setLoadingDone]);

  return (
    <div
      className={`typing-indicator elementToFadeInAndOut ${
        props.loadingDone ? "hide" : ""
      }`}
    >
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
};

export default LoadingBubble;
