import { useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "./Data";
import CustomInput from "./CustomInput";

const GOAL_LISTS = [
  "Career advancement",
  "Health and fitness",
  "Personal growth",
  "Relationship enrichment",
];

const OBSTACLE_LIST = [
  "Work-related stress",
  "Health issues",
  "Time management difficulties",
  "Financial pressures",
];

const EMOTION_LIST = [
  "Confidence and empowerment",
  "Positivity and optimism",
  "Determination and resilience",
  "Inner peace and calm",
];

const Home = () => {
  const errorRef = useRef(null);
  const navigate = useNavigate();

  const {
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
    isSubmitLoading,
    handleSubmit,
  } = useContext(Context);

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
            {GOAL_LISTS.map((item, index) => (
              <CustomInput
                key={index}
                name="goal"
                id={`goal-${index}`}
                value={item}
                data={goal}
                setData={setGoal}
              />
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xl">
              What challenges or obstacles are you currently facing?
            </p>
            {OBSTACLE_LIST.map((item, index) => (
              <CustomInput
                key={index}
                name="obstacle"
                id={`obstacle-${index}`}
                value={item}
                data={obstacle}
                setData={setObstacle}
              />
            ))}
          </div>

          <div className="mt-10">
            <p className="mb-3 text-xl">
              What kind of emotions do you find most uplifting when seeking
              motivation?
            </p>
            {EMOTION_LIST.map((item, index) => (
              <CustomInput
                key={index}
                name="emotion"
                id={`emotion-${index}`}
                value={item}
                data={emotion}
                setData={setEmotion}
              />
            ))}
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
              className="p-5 w-full bg-purple-500 text-white font-fortune-cookie text-2xl rounded-sm disabled:bg-slate-500 disabled:cursor-not-allowed"
              onClick={async () => {
                const response = await handleSubmit();
                if (response) {
                  navigate("/cookie", {
                    state: {
                      message: response,
                    },
                  });
                }
              }}
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
