import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./messagebubble.css";

const MessageBubble = (props) => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const decodeEmojis = (string) => {
    let content = new Uint8Array(
      Array.prototype.map.call(string, (c) => c.charCodeAt(0))
    );
    return new TextDecoder("utf8").decode(content);
  };

  const importMedia = async (mediaPath, media) => {
    const file = media === "photos" ? "photos" : "videos";
    const imports = mediaPath.map((path) => {
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

  const MediaModal = ({ content, type, onClose }) => {
    return ReactDOM.createPortal(
      <div
        className="modal"
        onClick={onClose}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 1000,
        }}
      >
        {type === "image" ? (
          <img
            src={content}
            alt="Enlarged"
            style={{
              maxHeight: "85%",
              maxWidth: "85%",
              height: "auto",
              width: "auto",
              zIndex: 10,
            }}
          />
        ) : (
          <video
            src={content}
            controls
            autoPlay
            style={{
              maxHeight: "80vh",
              maxWidth: "80vw",
              height: "auto",
              width: "auto",
              zIndex: 10,
            }}
          />
        )}
      </div>,
      document.getElementById("modal-root") // This is where the portal points to
    );
  };

  // Function to handle opening the modal
  const openModal = (content, type) => {
    setModalContent({ content, type });
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setModalContent(null);
  };

  let content;
  let reaction;
  let shareText;
  let shareName;
  let isShare = false;

  try {
    content = props.message.hasOwnProperty("content")
      ? decodeEmojis(props.message.content)
      : null;

    // decode share fields
    if (props.message.share.link !== "") {
      shareText = decodeEmojis(props.message.share.share_text);

      let regex = new RegExp(/[^\s]+(.*?).(gif|GIF)$/);

      if (regex.test(props.message.share.link)) {
        content = <img src={props.message.share.link} alt="gif" />;
      } else {
        isShare = true;
        shareName =
          props.message.share.original_content_owner !== ""
            ? props.message.share.original_content_owner
            : props.message.share.profile_share_name;
        shareName = decodeEmojis(shareName);
      }
    }

    reaction = props.message.hasOwnProperty("reactions")
      ? decodeEmojis(props.message.reactions[0].reaction)
      : null;
  } catch (error) {}

  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
  };
  const date = new Date(props.message.timestamp_ms);

  const simpleTimestamp = date.toLocaleDateString("en-US", timeOptions);

  return (
    <div className={`bubble-container ${props.side}`}>
      <div
        className={`bubble ${props.side} ${props.classType} ${props.source}`}
      >
        {isShare && (
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
        {showModal && (
          <MediaModal
            content={modalContent.content}
            type={modalContent.type}
            onClose={closeModal}
          />
        )}
        {images.length > 0 && (
          <div className="images">
            {images.map((src, index) => (
              <img
                key={index}
                src={src}
                alt={`Message Attachment ${index}`}
                onClick={() => openModal(src, "image")}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        )}
        {videos.length > 0 && (
          <div className="images">
            {videos.map((src, index) => (
              <video
                key={index}
                src={src}
                // controls
                onClick={() => openModal(src, "video")}
                style={{ cursor: "pointer" }}
              />
            ))}
          </div>
        )}
        {isShare === false && <h4>{content}</h4>}
        {props.message.reactions && (
          <span className={`reaction ${props.side}`}>{reaction}</span>
        )}
        <span className={`timestamp ${props.side}`}>{simpleTimestamp}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
