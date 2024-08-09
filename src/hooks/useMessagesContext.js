import { MessagesContext } from "../context/messageContext";
import { useContext } from "react";

export const useMessagesContext = () => {
  const context = useContext(MessagesContext);

  if (!context) {
    throw Error(
      "useExpensesContext must be used inside an expensesContextProvider"
    );
  }

  return context;
};
