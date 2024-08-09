import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useMessagesContext } from "../hooks/useMessagesContext";

export default function useMessageQuery(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  const { message, dispatch } = useMessagesContext();
  const { user } = useAuthContext();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchMessages = async () => {
      const response = await fetch(
        "https://anniversary-preview-backend.onrender.com/api/messages",
        {
          headers: {
            Authorization: `Bearer ${user._id}`,
            params: { q: query, page: pageNumber },
          },
        }
      );
      const json = await response.json();
      // console.log("Fetched Messages:", json); // Check if Messages are being fetched
      console.log(response);
      if (response.ok) {
        dispatch({ type: "SET_MESSAGE", PAYLOAD: json });
      }
      console.log(json);
      return json;
    };
    if (user) {
      const m = fetchMessages();
      setMessages((prevBooks) => {
        return [...new Set([prevBooks, m])];
      });
      setHasMore(m.length > 0);
      setLoading(false);
    }
  }, [dispatch, user, query, pageNumber]);

  return loading, error, messages, hasMore;
}
