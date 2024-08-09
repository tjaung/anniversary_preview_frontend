import { useAuthContext } from "./useAuthContext";
import { useMessagesContext } from "./useMessagesContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: messageDispatch } = useMessagesContext();
  const logout = () => {
    // remove local storage tokens
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    messageDispatch({ type: "SET_MESSAGES", PAYLOAD: null });
  };
  return { logout };
};
