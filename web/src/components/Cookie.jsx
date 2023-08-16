import { Player } from "@lottiefiles/react-lottie-player";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Cookie = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      return navigate("/");
    }
  }, [location, navigate]);

  return (
    <div className="relative z-20 mt-20">
      <h1 className="text-white text-5xl lg:text-6xl xl:text-8xl font-fortune-cookie text-center">
        Fortune Cookie
      </h1>
      <Player
        src="https://lottie.host/b457d801-1175-422a-9246-1ad2da00ea77/kCZah6RGM3.json"
        className="w-60 h-60 lg:w-[400px] lg:h-[400px]"
        autoplay
        loop={false}
        keepLastFrame
      />
      <div className="flex justify-center items-center pb-20">
        <div className="w-[80%] lg:w-1/2 h-30 bg-white p-5">
          <p className="text-black animate-text">
            {location?.state?.message || ""}
          </p>
        </div>
      </div>

      <div className="py-10 flex justify-center items-center">
        <button
          className="w-fit p-5 bg-purple-500 font-fortune-cookie text-2xl rounded-sm"
          onClick={() => navigate("/")}
        >
          Crack another cookie
        </button>
      </div>
    </div>
  );
};

export default Cookie;
