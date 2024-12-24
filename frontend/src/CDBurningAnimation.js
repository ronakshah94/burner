import React, { useState } from 'react';

const CDBurningAnimation = ({songs}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  
  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSong(0);
      
      const songInterval = setInterval(() => {
        setCurrentSong(prev => {
          if (prev >= songs.length - 1) {
            clearInterval(songInterval);
            setTimeout(() => {
              setIsAnimating(false);
              setCurrentSong(0);
            }, 2000);
            return prev;
          }
          return prev + 1;
        });
      }, 2000);
    }
  };

  return (
    <div className="">
      {/* Button */}
      <button
        onClick={startAnimation}
        disabled={isAnimating}
        className={`absolute top-4 left-4 px-6 py-3 rounded-lg text-white font-bold transition-all ${
          isAnimating ? 'bg-gray-500' : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isAnimating ? 'Burning...' : 'Burn CD'}
      </button>

      {/* Fullscreen Animation */}
      {isAnimating && (
        <div className="fixed inset-0 bg-black flex items-center justify-center">
          <div className="text-center">

            {/* Burning Progress */}
            <div className="space-y-4 mt-8">
              <div className="text-white text-xl font-semibold">
                Burning Track: {songs[currentSong].title}
              </div>
              
              {/* Progress Bar */}
              <div className="w-96 bg-gray-700 rounded-full h-4 overflow-hidden">
                <div 
                  className="h-full bg-orange-500 transition-all duration-1000"
                  style={{
                    width: `${((currentSong + 1) / songs.length) * 100}%`
                  }}
                />
              </div>
              
              <div className="text-gray-400">
                {currentSong + 1} of {songs.length} tracks
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CDBurningAnimation;