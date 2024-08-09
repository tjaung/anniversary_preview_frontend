import React, { useEffect, useState, useRef, useCallback } from "react";
import { useMessagesContext } from "../hooks/useMessagesContext";
import Letter from "../components/Letter/Letter";
import IntroAnimation from "../components/IntroMessages/Intro";
import Chapter from "../components/Chapter/Chapter";
import Loader from "../components/Loader/Loader";
import Timeline from "../components/Navbar/Timeline";

const Home = (props) => {
  const [eras, setEras] = useState({});
  const [isLoading, setIsLoading] = useState(false); // State to manage loading status
  const { dispatch: messageDispatch } = useMessagesContext();
  const [activeNav, setActiveNav] = useState("#home");
  console.log(activeNav);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const sectionRefs = {
    "#home": useRef(null),
    "#beginning": useRef(null),
    "#secondChapter": useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          console.log(
            `${entry.target.id} is intersecting: ${entry.isIntersecting}`
          );
          console.log(entry.target.id, entry.isIntersecting);
          if (entry.isIntersecting) {
            setActiveNav(`#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.5 }
    ); // Adjust threshold based on when you want to change the active state

    Object.values(sectionRefs).forEach((id, ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [sectionRefs]);

  const user = props.user;

  const fetchMessages = useCallback(async () => {
    if (!user || Object.keys(eras).length !== 0) return; // Guard clause if no user or eras is already set
    setIsLoading(true); // Start loading
    try {
      const response = await fetch(
        "https://anniversary-preview-backend.onrender.com/api/messages",
        {
          headers: {
            Authorization: `Bearer ${user._id}`,
            dateStart: 1636987092159,
            dateEnd: 1714082322790,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch");
      const json = await response.json();
      messageDispatch({ type: "SET_MESSAGE", payload: json });
      setEras(json);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setIsLoading(false); // End loading regardless of outcome
    }
  }, [user, eras, messageDispatch]); // Dependency array includes only what is necessary

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]); // Only re-run on fetchMessages change

  return (
    <div className="home">
      {isLoading ? (
        <Loader /> // Conditional rendering of Loader
      ) : (
        <>
          {user && Object.keys(eras).length !== 0 ? (
            <>
              <div
                ref={sectionRefs["#home"]}
                id="home"
                className="title-screen"
              >
                <Letter />
                <IntroAnimation />
              </div>
              <div className="about">
                <p>
                  I had this idea to create a diary of sorts using messages
                  across instagram and facebook between me and my girlfriend.
                  She likes to reminisce on the progression of our relationship
                  from friends to dating, and I agree that it is fun. A lot of
                  our history is written in our messages.
                </p>
                <p>
                  There was one problem with this: We have a lot of data, and
                  neither instagram nor facebook messenger have a great search
                  function. If we wanted to look through our messages, it would
                  take ages of scrolling, or requesting a download of our data,
                  waiting a few days, then reading in a non-user friendly ui.
                </p>
                <p>
                  This page was made so that we could easily access all of that
                  data in one place quickly. It is only for us so I made the
                  authentification so that only we can access it. This is the{" "}
                  <a
                    href="https://theshefsoneyearanniversary.netlify.app/"
                    target="none"
                  >
                    real page
                  </a>
                  , but you won't be able to get in.
                </p>
              </div>
              <Timeline setActiveNav={setActiveNav} />
              <div ref={sectionRefs["#beginning"]}>
                <Chapter
                  data={eras.beginning}
                  sectionRefs={sectionRefs}
                  id={"beginning"}
                  title={"First Era"}
                  desc={
                    "The page is divided into 'eras'. Eras are subjective periods defined by some aspect of our relationship e.g. a period initial getting to know each other, a period where we bullied each other a lot, a period of flirting, etc. Each era has sub sections called 'chapters'. Here's a sample using some data from another friend. Try clicking on a picture in the second section!"
                  }
                />
              </div>
              <div ref={sectionRefs["#secondChapter"]}>
                <Chapter
                  data={eras.secondChapter}
                  sectionRefs={sectionRefs}
                  id={"secondChapter"}
                  title={"Another Era"}
                  desc={
                    "here is another era section. Did you try clicking a picture in the last section? I used a portal to render a component to the top of the page. That component takes the media and enlarges it. Clicking outside of the media toggles it off. This works for videos as well. You might have noticed the transparent grey nav bar on the right side, or bottom of the screen if on mobile. Each icon in there is an a tag to a different era. This makes for easier navigation, especially when there are many eras."
                  }
                />
              </div>

              <div className="about">
                <p>
                  This page was created with the MERN stack. Originally a
                  personal project not intended for others to see, but I thought
                  it might be a nice demonstration of my development skills.
                </p>
                <p>
                  At the time of completion, I have zero computer science course
                  work. Everything I know is learned either on the job or
                  through self teaching. Even without a formal college
                  education, I learned enough to create full stack applications
                  with MongoDB, Express, React, and Node.js.
                </p>
                <p>
                  This page utilizes many react tools for efficiency. Since I
                  was reading in a lot of documents containing the message data,
                  I had to think of ways to efficiently query and render it. I
                  used lazy loading and list virtualization to handle this.
                  Authentification was handled through using contexts and login
                  hooks.
                </p>
                <p>_____________________________</p>
                <p>
                  Full repo for frontend:{" "}
                  <a
                    href="https://github.com/tjaung/anniversary_preview_frontend"
                    target="none"
                  >
                    github
                  </a>
                </p>
                <p>
                  Full repo for backend:{" "}
                  <a
                    href="https://github.com/tjaung/anniversary_preview_backend"
                    target="none"
                  >
                    github
                  </a>
                </p>
              </div>
            </>
          ) : (
            <div>
              <p>Need to login</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
