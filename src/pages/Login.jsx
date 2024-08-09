import { useState } from "react";
import { useLogin } from "../hooks/useLogin";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import LoginIcon from "@mui/icons-material/Login";

const Login = () => {
  const [question, setQuestion] = useState(
    "Welcome to my anniversary page! To protect the data on the real page I made this one to preview all the functionality of the old one. Type 'guest' to continue."
  );
  const [number, setNumber] = useState(0);
  const [field, setField] = useState("user");
  const [animationClass, setAnimationClass] = useState("fade-in-right");

  const { login, error, isLoading } = useLogin();
  // let arrow = <ArrowForwardIcon />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    let answer = e.target[0].value;

    // Perform login action and check response
    const res = await login(field, answer);
    if (res) {
      // Trigger fade-out animation
      setAnimationClass("fade-out-left");

      // Wait for animation to complete
      setTimeout(() => {
        const nextNumber = number + 1;
        setNumber(nextNumber);

        // Update question and field based on the current step
        if (nextNumber === 0) {
          setQuestion(
            "Welcome to my anniversary page! To protect the data on the real page I made this one to preview all the functionality of the old one. Type 'guest' to continue."
          );
          setField("user");
        } else if (nextNumber === 1) {
          setQuestion(
            "The login page has 3 steps: a user name, and two passwords. Type 'hunter' to continue."
          );
          setField("password1");
        } else if (nextNumber === 2) {
          setQuestion(
            "The last password changes the arrow icon to a login one. Type '2' to login."
          );
          setField("password2");
        }

        // Trigger fade-in animation
        setAnimationClass("fade-in-right");

        // Clear input field
        e.target[0].value = "";

        // Remove animation classes after the animation completes
        setTimeout(() => setAnimationClass(""), 500);
      }, 500); // Match this duration with the animation duration
    } else {
      console.log("Login failed");
    }
  };

  return (
    <form className={`login ${animationClass}`} onSubmit={handleSubmit}>
      <label>{question}</label>
      <div className="login-inputs">
        <input type="text" />
        <button className="btn" disabled={isLoading}>
          {number < 2 ? <ArrowForwardIcon /> : <LoginIcon />}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
