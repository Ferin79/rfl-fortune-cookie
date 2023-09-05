import { useEffect, useRef } from 'react';
import { RouterProvider } from 'react-router-dom';
import Background from './assets/background.jpg';
import Music from './assets/beloved.mp3';
import Footer from './components/Footer';
import Header from './components/Header';
import router from './components/router';

function App() {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.volume = 0.05;
    }
  }, []);

  return (
    <div className='relative min-h-[100vh] w-full'>
      <Header />
      <RouterProvider router={router} />
      <img
        src={Background}
        className='absolute top-0 left-0 h-full w-full object-fit z-[5]'
      />
      <div className='absolute top-0 left-0 h-full w-full z-10 bg-black opacity-50'></div>
      <audio ref={playerRef} src={Music} autoPlay loop />
      <Footer />
    </div>
  );
}

export default App;
