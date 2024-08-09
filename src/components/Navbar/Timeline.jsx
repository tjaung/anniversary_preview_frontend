import { useState } from "react";

import "./timeline.css";

import { FaRegCircleDot } from "react-icons/fa6";

const Timeline = ({ setActiveNav, isSticky }) => {
  const [tooltip, setTooltip] = useState("");

  return (
    <div className={`timeline ${isSticky ? "sticky" : ""}`}>
      <a
        href="#home"
        onClick={() => setActiveNav("#home")}
        onMouseEnter={() => setTooltip("Top")}
        onMouseLeave={() => setTooltip("")}
      >
        <FaRegCircleDot />
        {tooltip === "Top" && <span className="tooltip">Top</span>}
      </a>
      <a
        href="#beginning"
        onClick={() => setActiveNav("#beginning")}
        onMouseEnter={() => setTooltip("first")}
        onMouseLeave={() => setTooltip("")}
      >
        <FaRegCircleDot />
        {tooltip === "first" && <span className="tooltip">First Era</span>}
      </a>
      <a
        href="#opPhase"
        onClick={() => setActiveNav("#secondChapter")}
        onMouseEnter={() => setTooltip("secondSection")}
        onMouseLeave={() => setTooltip("")}
      >
        <FaRegCircleDot />
        {tooltip === "secondSection" && (
          <span className="tooltip">Second Section</span>
        )}
      </a>
    </div>
  );
};

export default Timeline;
