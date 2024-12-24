import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

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
    <Container maxWidth="sm">
      <Typography variant="h1" gutterBottom>
          Build playlists!
        </Typography>
      <Grid container direction={'column'} alignItems={'center'}>
      <Button variant="outlined"
        onClick={startAnimation}
        disabled={isAnimating}
      >
        {isAnimating ? 'Burning...' : 'Burn CD'}
      </Button>
      {/* Fullscreen Animation */}
      {isAnimating && (
          <div className="text-center">
            {/* Burning Progress */}
              <div className="text-white text-xl font-semibold">
                Burning Track: {songs[currentSong].title}
              </div>
              <div className="text-gray-400">
                {currentSong + 1} of {songs.length} tracks
              </div>
            </div>
      )}
      </Grid>
      </Container>
  );
};

export default CDBurningAnimation;