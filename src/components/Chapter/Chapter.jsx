import React, { lazy, Suspense } from "react";

import "./chapter.css";
import Loader from "../Loader/Loader";

const Conversation = lazy(() => import("../MessageDetails/Conversation"));
// import Conversation from '../MessageDetails/Conversation'

const Chapter = (props) => {
  const chapters = [];
  const convoTitles = [];
  for (const chap in props.data) {
    chapters.push(props.data[chap]);
    const newTitle = chap.replace(/_/g, " ");
    console.log(newTitle);
    convoTitles.push(newTitle);
  }
  console.log(chapters);
  console.log(convoTitles);

  return (
    <div id={props.id} className="chapter">
      <div className="chapter-header">
        <h1>{props.title}</h1>
        <p>{props.desc}</p>
      </div>
      {chapters.map((ele, ind) => (
        <>
          <Suspense
            fallback={
              <div>
                <Loader />
              </div>
            }
          >
            <Conversation data={ele["messages"]} title={convoTitles[ind]} />
          </Suspense>
        </>
      ))}
    </div>
  );
};

export default Chapter;
