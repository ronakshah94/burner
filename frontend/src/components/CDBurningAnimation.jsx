import React, { useState } from 'react';

const CDBurningAnimation = () => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentSong, setCurrentSong] = useState(0);
  
  const songs = [
    "1. Dancing Queen - ABBA",
    "2. Stayin' Alive - Bee Gees",
    "3. Hotel California - Eagles",
    "4. Bohemian Rhapsody - Queen",
    "5. Sweet Dreams - Eurythmics"
  ];

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
    <div className="relative h-screen w-full">
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
        <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
          <div className="text-center">
            {/* CD with Flames Animation */}
            <div className="relative w-64 h-64 animate-spin">
              {/* CD Base */}
              <svg viewBox="0 0 200 200" className="absolute inset-0">
                <defs>
                  {/* Gradient for CD surface */}
                  <linearGradient id="cdSurface" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#444" />
                    <stop offset="50%" stopColor="#888" />
                    <stop offset="100%" stopColor="#444" />
                  </linearGradient>
                  {/* Enhanced flame gradients */}
                  <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="#ff0000" />
                    <stop offset="40%" stopColor="#ff4500" />
                    <stop offset="70%" stopColor="#ff8c00" />
                    <stop offset="100%" stopColor="#ffd700" />
                  </linearGradient>
                  {/* Glow effect */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* CD Circle */}
                <circle cx="100" cy="100" r="95" fill="url(#cdSurface)" />
                
                {/* Center Flames */}
                <g filter="url(#glow)" className="animate-pulse">
                  {/* Large central flame */}
                  <path
                    d="M 100 100
                       Q 100 70, 110 50
                       Q 120 30, 100 10
                       Q 80 30, 90 50
                       Q 100 70, 100 100"
                    fill="url(#flameGradient)"
                    opacity="0.9"
                  >
                    <animate
                      attributeName="d"
                      dur="0.7s"
                      repeatCount="indefinite"
                      values="
                        M 100 100
                        Q 100 70, 110 50
                        Q 120 30, 100 10
                        Q 80 30, 90 50
                        Q 100 70, 100 100;
                        
                        M 100 100
                        Q 100 65, 115 45
                        Q 125 25, 100 5
                        Q 75 25, 85 45
                        Q 100 65, 100 100;
                        
                        M 100 100
                        Q 100 70, 110 50
                        Q 120 30, 100 10
                        Q 80 30, 90 50
                        Q 100 70, 100 100"
                    />
                  </path>
                  
                  {/* Additional dramatic flames */}
                  {[0, 60, 120, 180, 240, 300].map((rotation, index) => (
                    <path
                      key={index}
                      d={`M 100 100 
                         Q ${100 + Math.cos(rotation * Math.PI / 180) * 20} ${100 + Math.sin(rotation * Math.PI / 180) * 20},
                           ${100 + Math.cos(rotation * Math.PI / 180) * 40} ${100 + Math.sin(rotation * Math.PI / 180) * 40}
                         Q ${100 + Math.cos((rotation + 30) * Math.PI / 180) * 30} ${100 + Math.sin((rotation + 30) * Math.PI / 180) * 30},
                           100 100`}
                      fill="url(#flameGradient)"
                      opacity="0.8"
                      transform={`rotate(${rotation}, 100, 100)`}
                    >
                      <animate
                        attributeName="d"
                        dur="0.5s"
                        repeatCount="indefinite"
                        values={`
                          M 100 100 
                          Q ${100 + Math.cos(rotation * Math.PI / 180) * 20} ${100 + Math.sin(rotation * Math.PI / 180) * 20},
                            ${100 + Math.cos(rotation * Math.PI / 180) * 40} ${100 + Math.sin(rotation * Math.PI / 180) * 40}
                          Q ${100 + Math.cos((rotation + 30) * Math.PI / 180) * 30} ${100 + Math.sin((rotation + 30) * Math.PI / 180) * 30},
                            100 100;
                            
                          M 100 100 
                          Q ${100 + Math.cos(rotation * Math.PI / 180) * 25} ${100 + Math.sin(rotation * Math.PI / 180) * 25},
                            ${100 + Math.cos(rotation * Math.PI / 180) * 45} ${100 + Math.sin(rotation * Math.PI / 180) * 45}
                          Q ${100 + Math.cos((rotation + 35) * Math.PI / 180) * 35} ${100 + Math.sin((rotation + 35) * Math.PI / 180) * 35},
                            100 100`}
                      />
                    </path>
                  ))}
                </g>
                
                {/* CD Center Hole */}
                <circle cx="100" cy="100" r="20" fill="#222" />
              </svg>
            </div>

            {/* Burning Progress */}
            <div className="space-y-4 mt-8">
              <div className="text-white text-xl font-semibold">
                Burning Track: {songs[currentSong]}
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