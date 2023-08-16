import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [goal, setGoal] = useState("");
  const [obstacle, setObstacle] = useState("");
  const [emotion, setEmotion] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errorText, setErrorText] = useState("");
  const errorRef = useRef(null);
  const [isSubmitLoading, setIsSubmitLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setErrorText("");
    if (
      !goal.trim().length ||
      !obstacle.trim().length ||
      !emotion.trim().length
    ) {
      setErrorText("Please select all options");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (!name.trim().length) {
      setErrorText("Name is required");
      errorRef.current?.scrollIntoView();
      return;
    }

    if (!email.trim().length) {
      setErrorText("Email is required");
      errorRef.current?.scrollIntoView();
      return;
    }
    setIsSubmitLoading(true);
    localStorage.clear();
    localStorage.setItem(
      "fortune-cookie",
      JSON.stringify({ name, email, goal, obstacle, emotion })
    );
    axios
      .post("https://generatefortunecookie-p2uc2fwlha-uc.a.run.app", {
        name,
        email,
        emotion,
        obstacle,
        goal,
      })
      .then((response) => {
        navigate("/cookie", {
          state: {
            message: response.data.message,
          },
        });
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
    <div className="relative z-20 mt-20">
      <h1 className="text-white text-5xl lg:text-6xl xl:text-8xl font-fortune-cookie text-center">
        Fortune Cookie
      </h1>

      <div className="w-full flex justify-center items-center mt-20 pb-20">
        <div className="text-white text-lg font-montserrat w-[90%] lg:w-1/3 flex justify-center flex-col">
          <p ref={errorRef} className="text-red-600 text-2xl font-montserrat">
            {errorText}
          </p>

          <div className="mt-10">
            <p className="mb-3 text-xl">
              What is your biggest goal or aspiration right now?
            </p>
            <div className="mb-1">
              <input
                name="goal"
                type="radio"
                className="mr-2"
                id="goal-1"
                checked={goal === "Career advancement" ? true : false}
                onChange={() => setGoal("Career advancement")}
              />
              <label className="cursor-pointer" htmlFor="goal-1">
                Career advancement
              </label>
            </div>
            <div className="mb-1">
              <input
                name="goal"
                type="radio"
                className="mr-2"
                id="goal-2"
                checked={goal === "Health and fitness" ? true : false}
                onChange={() => setGoal("Health and fitness")}
              />
              <label className="cursor-pointer" htmlFor="goal-2">
                Health and fitness
              </label>
            </div>
            <div className="mb-1">
              <input
                name="goal"
                type="radio"
                className="mr-2"
                id="goal-3"
                checked={goal === "Personal growth" ? true : false}
                onChange={() => setGoal("Personal growth")}
              />
              <label className="cursor-pointer" htmlFor="goal-3">
                Personal growth
              </label>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xl">
              What challenges or obstacles are you currently facing?
            </p>
            <div className="mb-1">
              <input
                name="obstacles"
                type="radio"
                className="mr-2"
                id="obstacle-1"
                checked={obstacle === "Work-related stress" ? true : false}
                onChange={() => setObstacle("Work-related stress")}
              />
              <label className="cursor-pointer" htmlFor="obstacle-1">
                Work-related stress
              </label>
            </div>
            <div className="mb-1">
              <input
                name="obstacles"
                type="radio"
                className="mr-2"
                id="obstacle-2"
                checked={obstacle === "Health issues" ? true : false}
                onChange={() => setObstacle("Health issues")}
              />
              <label className="cursor-pointer" htmlFor="obstacle-2">
                Health issues
              </label>
            </div>
            <div className="mb-1">
              <input
                name="obstacles"
                type="radio"
                className="mr-2"
                id="obstacle-3"
                checked={
                  obstacle === "Time management difficulties" ? true : false
                }
                onChange={() => setObstacle("Time management difficulties")}
              />
              <label className="cursor-pointer" htmlFor="obstacle-3">
                Time management difficulties
              </label>
            </div>
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xl">
              What kind of emotions do you find most uplifting when seeking
              motivation?
            </p>
            <div className="mb-1">
              <input
                name="emotions"
                type="radio"
                className="mr-2"
                id="emotion-1"
                checked={
                  emotion === "Confidence and empowerment" ? true : false
                }
                onChange={() => setEmotion("Confidence and empowerment")}
              />
              <label className="cursor-pointer" htmlFor="emotion-1">
                Confidence and empowerment
              </label>
            </div>
            <div className="mb-1">
              <input
                name="emotions"
                type="radio"
                className="mr-2"
                id="emotion-2"
                checked={emotion === "Positivity and optimism" ? true : false}
                onChange={() => setEmotion("Positivity and optimism")}
              />
              <label className="cursor-pointer" htmlFor="emotion-2">
                Positivity and optimism
              </label>
            </div>
            <div className="mb-1">
              <input
                name="emotions"
                type="radio"
                className="mr-2"
                id="emotion-3"
                checked={
                  emotion === "Determination and resilience" ? true : false
                }
                onChange={() => setEmotion("Determination and resilience")}
              />
              <label className="cursor-pointer" htmlFor="emotion-3">
                Determination and resilience
              </label>
            </div>
          </div>

          <div className="mt-10">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-5 py-3 rounded-sm text-black"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-5 py-3 rounded-sm text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-10">
            <button
              className="p-5 w-full bg-purple-500 font-fortune-cookie text-2xl rounded-sm disabled:bg-slate-500 disabled:cursor-not-allowed"
              onClick={handleSubmit}
              disabled={isSubmitLoading}
            >
              {isSubmitLoading ? "Loading..." : "Crack your cookie"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
