import { Player } from "@lottiefiles/react-lottie-player";
import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Context } from "./Data";

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
    <div className="relative z-20 mt-20">
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
      <div className="flex justify-center items-center pb-20">
        <div className="w-[80%] lg:w-1/2 h-30 bg-white p-5">
          <p className={`text-black ${startAnimation && "animate-text"}`}>
            {message}
          </p>
        </div>
      </div>

      <div className="py-10 flex justify-center items-center">
        <button
          disabled={isSubmitLoading}
          className="w-fit p-5 bg-purple-500 font-fortune-cookie text-2xl rounded-sm mr-5 text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
          onClick={() => navigate("/")}
        >
          Start over
        </button>
        <button
          disabled={isSubmitLoading}
          className="w-fit p-5 bg-blue-700 font-fortune-cookie text-2xl rounded-sm text-white disabled:bg-slate-500 disabled:cursor-not-allowed"
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
