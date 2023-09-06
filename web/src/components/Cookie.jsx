import { Player } from '@lottiefiles/react-lottie-player';
import { AnimatePresence, motion } from 'framer-motion';
import { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import PaperImg from '../assets/paper.jpg';
import { Context } from './Data';

const Cookie = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleSubmit, email, isSubmitLoading } = useContext(Context);
  const [message, setMessage] = useState('');
  const playerRef = useRef();
  const [startAnimation, setStartAnimation] = useState(true);

  useEffect(() => {
    if (location.state === null || location.state === undefined) {
      return navigate('/');
    }
    if (!email.trim().length) {
      return navigate('');
    }
    setMessage(location.state?.message || '');
  }, [location, navigate, email]);

  return (
    <AnimatePresence>
      <div className='relative z-20 mt-10'>
        <h1 className='text-white text-2xl lg:text-4xl xl:text-6xl font-sedgwick text-center'>
          Your Daily Dose
        </h1>
        <h1 className='text-white text-2xl lg:text-4xl xl:text-6xl font-sedgwick text-center mt-5'>
          of Personalized Wellness Motivation
        </h1>
        {startAnimation && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            exit={{ opacity: 0 }}
          >
            <Player
              ref={playerRef}
              src='https://lottie.host/5d64ff52-fe36-4663-b441-b9c9d6c8f961/KoqxWt3cvl.json'
              className={`w-60 h-60 lg:w-[400px] lg:h-[400px]`}
              autoplay
              loop={false}
              keepLastFrame
              onEvent={(event) => {
                if (event === 'complete') {
                  setStartAnimation(false);
                }
              }}
            />
          </motion.div>
        )}

        {!startAnimation && (
          <motion.div
            className={`flex justify-center items-center mt-20 pb-5`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            exit={{ opacity: 0 }}
          >
            <div className='w-[80%] lg:w-1/2 h-auto bg-white p-5 relative'>
              <p
                className={`text-black text-xl relative z-20 ${
                  startAnimation && 'animate-text'
                }`}
              >
                {message}
              </p>
              <img
                src={PaperImg}
                className='h-full w-full absolute top-0 left-0 object-cover z-10'
              />
            </div>
          </motion.div>
        )}

        <div className='py-10 flex flex-col justify-center items-center mx-5 md:mx-0'>
          <button
            disabled={isSubmitLoading}
            className='w-full md:w-fit p-5 bg-purple-500 font-sedgwick text-2xl rounded-sm mr-0 md:mr-5 mb-10 text-white disabled:bg-slate-500 disabled:cursor-not-allowed'
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
            Generate New Motivation
          </button>

          <button
            disabled={isSubmitLoading}
            className='w-full md:w-fit p-5 underline font-sedgwick text-2xl rounded-sm mr-0 md:mr-5 text-white disabled:text-slate-500 disabled:cursor-not-allowed'
            onClick={() => navigate('/')}
          >
            Start over
          </button>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default Cookie;
