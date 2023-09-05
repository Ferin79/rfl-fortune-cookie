import Logo from '../assets/real-food-love.webp';

const Header = () => {
  return (
    <header className='relative h-[20vh] w-full py-5 shadow flex justify-center items-center z-20'>
      <a
        className='h-full w-auto'
        target='_blank'
        href='https://realfoodlove.com/'
        rel='noreferrer'
      >
        <img className='h-full object-cover' src={Logo}></img>
      </a>
    </header>
  );
};

export default Header;
