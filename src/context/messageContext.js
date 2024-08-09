import { createContext, useReducer } from "react";

export const MessagesContext = createContext();

export const messageReducer = (state, action) => {
  console.log("entering messageReducer...");
  console.log(action.type);
  switch (action.type) {
    case "SET_MESSAGE":
      return {
        messages: action.PAYLOAD,
      };
    case "CLEAR_MESSAGES":
      return { messages: [] }; // Reset the messages state
    case "CREATE_MESSAGE":
      return {
        messages: [action.PAYLOAD, ...state.messages],
      };
    case "DELETE_MESSAGE":
      return {
        messages: state.messages.filter((w) => w._id !== action.PAYLOAD._id),
      };
    case "ADD_MESSAGES":
      return {
        messages: [...state.messages, ...action.PAYLOAD],
      };
    default:
      return state;
  }
};

export const MessageContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(messageReducer, {
    message: [],
  });

  return (
    <MessagesContext.Provider value={{ ...state, dispatch }}>
      {children}
    </MessagesContext.Provider>
  );
};
