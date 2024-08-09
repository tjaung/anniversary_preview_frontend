import { useAuthContext } from "../../hooks/useAuthContext";

import "./messageLine.css";
import MessageBubble from "./MessageBubble.jsx";

// import AddComment from "../Comments/AddComment.jsx";

const MessageLine = ({ message, classType }) => {
  const { user } = useAuthContext();

  // Determine the class based on the sender's name
  let messageClass;

  const loggedOnUser = user.user.toString().split(" ")[0].toLowerCase();

  if (loggedOnUser === "guest") {
    messageClass = message.sender_name === "Tim J" ? "recipient" : "sender";
  } else if (loggedOnUser === "Tim J") {
    messageClass = message.sender_name === "Tia" ? "recipient" : "sender";
  }

  const source = message.source;

  return (
    <>
      <div
        className={
          messageClass === "recipient"
            ? "message__outer receive"
            : "message__outer"
        }
      >
        <div className="message__holder">
          <div className="message__avatar"></div>
          <div
            className={
              messageClass === "recipient"
                ? "message__inner receive"
                : "message__outer"
            }
          >
            <div className="message__bubble">
              <MessageBubble
                side={messageClass}
                message={message}
                classType={classType}
                source={source}
              />
            </div>
            <div className="message__actions">
              {/* <AddComment message={message} /> */}
            </div>
            <div className="message__spacer"></div>
          </div>
          <div className="message__status"></div>
        </div>
        <div className="message_holder_spacer"></div>
      </div>
    </>
  );
};

export default MessageLine;
