import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const Context = createContext(null);

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [goal, setGoal] = useState([]);
  const [obstacle, setObstacle] = useState([]);
  const [emotion, setEmotion] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);

  const handleSubmit = async () => {
    setErrorText("");

    if (!name.trim().length) {
      setErrorText("Name is required");
      return;
    }

    if (!email.trim().length) {
      setErrorText("Email is required");
      return;
    }
    setIsSubmitLoading(true);
    localStorage.clear();
    localStorage.setItem(
      "fortune-cookie",
      JSON.stringify({ name, email, goal, obstacle, emotion })
    );
    return axios
      .post("https://fortunecookie-p2uc2fwlha-uc.a.run.app", {
        name,
        email,
        emotion,
        obstacle,
        goal,
      })
      .then((response) => {
        return response.data.message;
      })
      .catch((error) => {
        setErrorText(JSON.stringify(error.message));
      })
      .finally(() => {
        setIsSubmitLoading(false);
      });
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("fortune-cookie") || "{}");
    if (!data || !data.email) {
      return;
    }
    setGoal(data.goal);
    setObstacle(data.obstacle);
    setEmotion(data.emotion);
    setName(data.name);
    setEmail(data.email);
  }, []);

  return (
    <Context.Provider
      value={{
        goal,
        setGoal,
        obstacle,
        setObstacle,
        emotion,
        setEmotion,
        name,
        setName,
        email,
        setEmail,
        errorText,
        setErrorText,
        isSubmitLoading,
        setIsSubmitLoading,
        handleSubmit,
      }}
    >
      {children}
    </Context.Provider>
  );
};
