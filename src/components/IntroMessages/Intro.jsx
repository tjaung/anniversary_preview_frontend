import React, { useState, useEffect } from "react";
import ChatLine from "./ChatLine";
import "./intro.css";
import { IoMdArrowDropdown } from "react-icons/io";

const IntroAnimation = () => {
  const messages = [
    {
      side: "send",
      content: "You made it!",
      loader: true,
    },
    {
      side: "receive",
      content: "Here's a little back and forth animation",
      loader: true,
    },
    {
      side: "receive",
      content: "i thought it would be an interesting intro",
      loader: false,
    },
    {
      side: "send",
      content: "the real site uses content from an actual conversation",
      loader: true,
    },
    {
      side: "send",
      content: "but you'll have to do with this",
      loader: false,
    },
    {
      side: "receive",
      content: "feel free to look around to see the page",
      loader: true,
    },
  ];

  const [visibleMessages, setVisibleMessages] = useState([]);
  const [showTitle, setShowTitle] = useState(false);

  useEffect(() => {
    const initialDelay = 1000; // 1 second delay before starting message timers
    const messageInterval = 2000; // Adjust interval as needed
    const messageArr = messages;
    const totalMessages = messages.length;

    const startTimers = () => {
      const timers = messageArr.map((message, index) => {
        return setTimeout(() => {
          setVisibleMessages((prevMessages) => [...prevMessages, message]);
        }, index * messageInterval);
      });

      const titleTimer = setTimeout(() => {
        setShowTitle(true);
      }, totalMessages * messageInterval);

      return () => {
        timers.forEach((timer) => clearTimeout(timer));
        clearTimeout(titleTimer);
      };
    };

    const initialTimer = setTimeout(startTimers, initialDelay);

    // Clear initial timer on cleanup
    return () => clearTimeout(initialTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this runs only once

  return (
    <>
      <div className="title-container">
        {showTitle && (
          <h1 className="title fadeIn">
            My One Year Anniversary Page (preview)
          </h1>
        )}
      </div>
      <div className="intro-container">
        {visibleMessages.map((message, index) => (
          <ChatLine
            key={index}
            side={message.side}
            content={message.content}
            loader={message.loader}
          />
        ))}
        {showTitle && (
          <a href="#contact" className="scroll-down">
            <IoMdArrowDropdown />
          </a>
        )}
      </div>
    </>
  );
};

export default IntroAnimation;
