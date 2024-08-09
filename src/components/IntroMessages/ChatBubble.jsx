import React, { useState, useEffect } from "react";
import "./chatBubble.css";

const ChatBubble = (props) => {
  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(true); // Immediately activate when this effect runs
  }, []);

  let sideClass;
  if (props.side === "send") {
    sideClass = "sender";
  } else if (props.side === "receive") {
    sideClass = "recipient";
  }

  return (
    <div
      className={`intro-bubble grow ${sideClass} ${active ? "show" : "hide"}`}
    >
      {props.content}
    </div>
  );
};

export default ChatBubble;
