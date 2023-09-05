const Footer = () => {
  return (
    <footer className='relative h-[10vh] w-full flex flex-col justify-center items-center z-20'>
      <p className='text-white'>
        Discover more by Real Food Love at{' '}
        <a
          className='text-[#724cf9]'
          href='https://realfoodlove.com'
          target='_blank'
          rel='noreferrer'
        >
          RealFoodLove.com
        </a>
      </p>
      <p className='text-white'>{new Date().getFullYear()} © Real Food Love</p>
    </footer>
  );
};

export default Footer;
