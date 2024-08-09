import { useAuthContext } from "../../hooks/useAuthContext";

import "./messageDetails.css";
const utf8 = require("utf8");

const MessageDetails = ({ message }) => {
  const { user } = useAuthContext();
  let content;
  let reaction;
  try {
    content = message.hasOwnProperty("content")
      ? utf8.decode(message.content)
      : null;
    reaction = message.hasOwnProperty("reactions")
      ? utf8.decode(message.reactions.reaction)
      : null;
  } catch (error) {}

  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const date = new Date(message.timestamp_ms);
  const messageDate = date.toLocaleDateString("en-US", options);

  // Determine the class based on the sender's name
  let messageClass;
  const loggedOnUser = user.user.toString().split(" ")[0].toLowerCase();
  if (loggedOnUser === "sithya") {
    messageClass =
      message.sender_name === "sith" ? "right-message" : "left-message";
  } else if (loggedOnUser === "tim") {
    messageClass =
      message.sender_name === "Tim J" ? "right-message" : "left-message";
  }
  // console.log(user.user.toString().split(" ")[0].toLowerCase());

  return (
    <div className={`single-message ${messageClass}`}>
      {message.share && (
        <div>
          <p>{message.link}</p>
          <p>From: {message.original_content_owner}</p>
          <p>{message.share_text}</p>
        </div>
      )}
      <h4>{content}</h4>
      <p>{message.sender_name}</p>
      <p className="message-date">{messageDate}</p>
      {reaction && (
        <div className="reaction">
          <p>{reaction}</p>
        </div>
      )}
    </div>
  );
};

export default MessageDetails;
