import React, { useState, useEffect } from "react";
import "./messagebubble.css";

const MessageBubble = (props) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);

  const decodeEmojis = (string) => {
    let content = new Uint8Array(
      Array.prototype.map.call(string, (c) => c.charCodeAt(0))
    );
    return new TextDecoder("utf8").decode(content);
  };

  const importMedia = async (mediaPath, media) => {
    const file = media === "photos" ? "photos" : "videos";
    const imports = mediaPath.map((path) => {
      // Adjust path if necessary
      return import(`../../assets/${file}${path.uri.split(`/${file}`)[1]}`);
    });
    if (file === "photos") {
      Promise.all(imports).then((images) => {
        setImages(images.map((mod) => mod.default));
      });
    }
    if (file === "videos") {
      Promise.all(imports).then((images) => {
        setVideos(images.map((mod) => mod.default));
      });
    }
  };

  useEffect(() => {
    if (props.message.photos && props.message.photos.length > 0) {
      importMedia(props.message.photos, "photos");
    }
  }, [props.message.photos]);

  useEffect(() => {
    if (props.message.videos && props.message.videos.length > 0) {
      importMedia(props.message.videos, "videos");
    }
  }, [props.message.videos]);

  // "your_instagram_activity/messages/inbox/sith_1102845581118362/photos/361585651_812370117113349_8413744177031028830_n_812370110446683.jpg";
  let content;
  let reaction;
  let shareText;
  let shareName;
  try {
    content = props.message.hasOwnProperty("content")
      ? decodeEmojis(props.message.content)
      : null;

    // decode share fields
    if (props.message.share.link !== "") {
      shareText =
        props.message.share.link !== ""
          ? decodeEmojis(props.message.share.share_text)
          : null;

      shareName =
        props.message.share.original_content_owner !== ""
          ? props.message.share.original_content_owner
          : props.message.share.profile_share_name;
      shareName = decodeEmojis(shareName);
    }

    reaction = props.message.hasOwnProperty("reactions")
      ? decodeEmojis(props.message.reactions[0].reaction)
      : null;

    console.log(content);
  } catch (error) {}

  // console.log(props.message)
  // console.log(props.classType)
  const options = {
    weekday: "short",
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(props.message.timestamp_ms);
  // const messageDate = date.toLocaleDateString("en-US", options);
  const simpleTimestamp = date.toLocaleDateString("en-US", timeOptions);
  // console.log(props.message)

  return (
    <div className={`bubble-container ${props.side}`}>
      <div
        className={`bubble ${props.side} ${props.classType} ${props.source}`}
      >
        {props.message.share.link !== "" && (
          <div className="share">
            {/* <p className="share-link">{props.message.share.link}</p> */}
            <p className="share-text">
              <a
                className="share-link"
                target="_blank"
                href={props.message.share.link}
                rel="noreferrer"
              >
                {shareName && shareName}{" "}
              </a>
              <h4>{content}</h4>
              {shareText && <p className="share-desc">{shareText}</p>}
            </p>
          </div>
        )}
        {images.length > 0 && (
          <div className="images">
            {images.map((src, index) => (
              <img key={index} src={src} alt={`Message Attachment ${index}`} />
            ))}
          </div>
        )}
        {videos.length > 0 && (
          <div className="images">
            {videos.map((src, index) => (
              <video
                key={index}
                src={src}
                alt={`Message Attachment ${index}`}
              />
            ))}
          </div>
        )}
        {props.message.share.link === "" && <h4>{content}</h4>}
        {props.message.reactions && (
          <span className={`reaction ${props.side}`}>{reaction}</span>
        )}
        <span className={`timestamp ${props.side}`}>{simpleTimestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
