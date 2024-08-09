import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { dispatch } = useAuthContext();
  const [user, setUser] = useState(null);

  const login = async (question, answer) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://anniversary-preview-backend.onrender.com/api/user/login",
        {
          mode: "cors",
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ question, answer }),
        }
      );

      const jsonRes = await response.json();

      if (!response.ok) {
        throw new Error(jsonRes.error || "Something went wrong");
      }
      if ("user" in jsonRes.userLogin) {
        console.log(jsonRes.userLogin);
        const newUser = jsonRes.userLogin;
        setUser(newUser);
        console.log(newUser);
      }
      if ("password2" in jsonRes.userLogin) {
        localStorage.setItem("user", JSON.stringify(user));
        console.log(user);
        // Update auth context
        dispatch({ type: "LOGIN", PAYLOAD: user });
        return jsonRes;
      }
      setIsLoading(false);
      return jsonRes;
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      return null; // Ensure null is returned on error
    }
  };

  return { login, isLoading, error };
};
