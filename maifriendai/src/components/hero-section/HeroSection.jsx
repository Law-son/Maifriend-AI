import aiAvatar from '../../assets/ai_avatar.png';

const HeroSection = () => {
  return (
    <div className='w-full h-full bg-primaryDark'>
      <div className="container flex flex-col justify-center p-6 mx-auto sm:py-12 lg:py-24 lg:flex-row lg:justify-between">
            <div className="flex items-center justify-center p-3 mt-5 lg:mt-0 h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128">
                <img src={aiAvatar} alt="" className="object-contain h-72 sm:h-80 lg:h-96 xl:h-112 2xl:h-128" />
            </div>
            <div className="flex flex-col justify-center p-6 text-center rounded-sm lg:max-w-md xl:max-w-lg lg:text-left">
                <h1 className="text-5xl font-bold text-mintGreen sm:text-6xl">
                    <span className="text-deepBlue">Maifriend</span> AI
                </h1>
                <p className="mt-6 mb-8 text-lg text-mintGreen sm:mb-12">Your advanced AI companion.
                    <br className="hidden md:inline lg:hidden" /> Exceptionally built to be interactively fun.
                </p>
                <div className="flex flex-col space-y-4 sm:items-center sm:justify-center sm:flex-row sm:space-y-0 sm:space-x-4 lg:justify-start">
                    <a rel="noopener noreferrer" href="#chat" className="px-8 py-3 text-lg font-semibold rounded bg-lightBlue text-primaryDark">Start Chat</a>
                    <a rel="noopener noreferrer" href="#generate" className="px-8 py-3 text-lg text-mintGreen font-semibold border rounded dark:border-mintGreen">Generate Image</a>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HeroSection
