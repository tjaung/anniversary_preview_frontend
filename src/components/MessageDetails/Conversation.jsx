import React from "react";
import { VariableSizeList as List } from "react-window";

import MessageLine from "./MessageLine.jsx";
import "./conversation.css";
import { useState, useEffect } from "react";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
}

const Conversation = (props) => {
  const windowSize = useWindowSize();

  const getItemSize = (index) => {
    const group = props.data[index];
    const numMessages = group.length;
    const baseHeight = 30 * numMessages; // base height for padding and margins

    let messagesHeight = 5;
    group.forEach((message) => {
      let messageHeight = 0; // default message height
      // Adjust heights based on screen size
      // if (message.content.toUpperCase() === message.content) {
      // if (message.content.length >= 30)
      //   if (windowSize.width < 600) {
      //     // for smaller devices
      //     messageHeight += 30 * Math.round(message.content.length / 30); // increase height due to wrapping text
      //   }

      if (message.content.length >= 30)
        if (windowSize.width < 600) {
          // for smaller devices
          messageHeight += 20 * Math.round(message.content.length / 30); // increase height due to wrapping text
        } else {
          messageHeight += 15 * Math.round(message.content.length / 70);
        }
      // adjust based on share content
      if (message.share.link !== "") {
        // If message is a
        let regex = new RegExp(/[^\s]+(.*?).(gif|GIF)$/);
        if (regex.test(message.share.link)) {
          messageHeight += 200;
        }
        if (message.share.share_text !== "") {
          messageHeight += 25;
        }
        if (
          message.share.original_content_owner !== "" ||
          message.share.profile_share_name !== ""
        ) {
          messageHeight += 25;
        }
      }
      if (message.photos.length > 0) {
        messageHeight += message.photos.length * 200;
      }
      if (message.videos.length > 0) {
        messageHeight += message.videos.length * 200;
      }

      messagesHeight += messageHeight;
    });

    const timestampLogHeight = group[0].timestamp_log ? 40 : 0;
    return baseHeight + messagesHeight + timestampLogHeight;
  };

  const renderRow = ({ index, style }) => {
    const group = props.data[index];
    return (
      <div style={style} key={index}>
        {group[0].timestamp_log !== null && (
          <div className="timestamp-log">{group[0].timestamp_log}</div>
        )}
        <div className="message-group">
          {group.map((message, idx) => (
            <MessageLine
              key={message._id}
              message={message}
              classType={message.class}
            />
          ))}
        </div>
      </div>
    );
  };

  console.log("conversation data size", props.data.length);
  return (
    <div className="conversation-section">
      <div>
        <h2 className="section-heading">{props.title}</h2>
      </div>
      <div className="messages">
        <List
          key={Math.floor(windowSize.width / 500)} // Re-renders on significant size changes
          height={600}
          width={"100%"}
          itemSize={getItemSize}
          itemCount={props.data.length}
          itemData={props.data}
        >
          {renderRow}
        </List>
      </div>
    </div>
  );
};

export default Conversation;
