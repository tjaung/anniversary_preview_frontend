import React, { useState, useEffect } from "react";
import "./chatLine.css";
import LoadingBubble from "./LoadingBubble";
import ChatBubble from "./ChatBubble";

const ChatLine = (props) => {
  const [loadingDone, setLoadingDone] = useState(false);

  useEffect(() => {
    if (!props.loader) {
      setLoadingDone(true);
    }
  }, [props.loader]);

  let receive;
  if (props.side === "send") {
    receive = false;
  } else {
    receive = true;
  }

  return (
    <>
      <div className={receive ? "message__outer receive" : "message__outer"}>
        <div className="message__holder">
          <div className="message__avatar"></div>
          <div
            className={receive ? "message__inner receive" : "message__outer"}
          >
            <div className="message__bubble">
              {props.loader && (
                <LoadingBubble
                  side={props.side}
                  setLoadingDone={setLoadingDone}
                  loadingDone={loadingDone}
                />
              )}
              {loadingDone && (
                <ChatBubble side={props.side} content={props.content} />
              )}
            </div>
            <div className="message__actions"></div>
            <div className="message__spacer"></div>
          </div>
          <div className="message__status"></div>
        </div>
      </div>
    </>
  );
};

export default ChatLine;
