import { Player } from "@lottiefiles/react-lottie-player";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "./Data";
import PaperImg from "../assets/paper.jpg";

const Cookie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, email, isSubmitLoading } = useContext(Context);
  const [message, setMessage] = useState("");
  const playerRef = useRef();
  const [startAnimation, setStartAnimation] = useState(true);

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      return navigate("/");
    }
    if (!email.trim().length) {
      return navigate("");
    }
    setMessage(location.state?.message || "");
  }, [location, navigate, email]);

  return (
    <div className="relative z-20 mt-10">
      <h1 className="text-white text-5xl lg:text-6xl xl:text-8xl font-fortune-cookie text-center">
        Fortune Cookie
      </h1>
      <Player
        ref={playerRef}
        src="https://lottie.host/b457d801-1175-422a-9246-1ad2da00ea77/kCZah6RGM3.json"
        className="w-60 h-60 lg:w-[400px] lg:h-[400px]"
        autoplay
        loop={false}
        keepLastFrame
        onEvent={(event) => {
          if (event === "complete") {
            setStartAnimation(false);
          }
        }}
      />
      <div className="flex justify-center items-center pb-5">
        <div className="w-[80%] lg:w-1/2 h-auto bg-white p-5 relative">
          <p
            className={`text-black text-xl relative z-20 ${
              startAnimation && "animate-text"
            }`}
          >
            {message}
          </p>
          <img
            src={PaperImg}
            className="h-full w-full absolute top-0 left-0 object-cover z-10"
          />
        </div>
      </div>

      <div className="py-10 flex flex-col md:flex-row justify-center items-center mx-5 md:mx-0">
        <button
          disabled={isSubmitLoading}
          className="w-full md:w-fit p-5 bg-purple-500 font-fortune-cookie text-2xl rounded-sm mr-0 md:mr-5 mb-5 md:mb-0 text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={() => navigate("/")}
        >
          Start over
        </button>
        <button
          disabled={isSubmitLoading}
          className="w-full md:w-fit p-5 bg-[#724cf9] font-fortune-cookie text-2xl rounded-sm text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={async () => {
            const response = await handleSubmit();
            if (response) {
              setStartAnimation(true);
              setMessage(response);
            }
            if (playerRef.current) {
              playerRef.current.setSeeker(0);
              playerRef.current.play();
            }
          }}
        >
          Crack another cookie
        </button>
      </div>
    </div>
  );
};

export default Cookie;
