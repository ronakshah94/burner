import React, { useEffect, useState, useContext} from 'react';
import CDBurningAnimation from './CDBurningAnimation';
import './App.css';

import Grid from '@mui/material/Grid2';
import Typography from '@mui/material/Typography';

const ComponentContext = React.createContext({
  songs: [], fetchSongs: () => {}
});

function AddSong() {
    const [title, setTitle] = useState("");
    const {songs, fetchSongs} = useContext(ComponentContext);

    const handleInput = event => {
      setTitle(event.target.value);
    }
    
    const handleSubmit = (event) => {
      const newSong = {
        "id" : songs.length +1,
        "title" : title
      };
    
      fetch("http://localhost:8000/add_songs", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newSong)
      }).then(fetchSongs)
    }

    return (
      <form onSubmit={handleSubmit}>
        <input pr="4.5rem"
          type="text"
          placeholder="Add a song title"
          aria-label="Add a song title"
          onChange={handleInput}/>
      </form>
    )
}

function CurrentSongs({songs}) {
  return (
    <>
      <Typography variant='h2'>Currently in playlist - </Typography>
  <Grid container direction={'column'} alignItems={'center'} spacing={0.5}>
    {songs.map((song) => (<Typography variant="h6">{song.title}</Typography>))}
  </Grid>
  </>
  );
}

function App() {
  const [songs, setSongs] = useState([]);
  const fetchSongs = async () => {
    const response = await fetch("http://localhost:8000/samples");
    const songsData = await response.json();
    setSongs(songsData.data);
  };

  useEffect(() => {
    fetchSongs()
  }, []);

  return (
    <ComponentContext.Provider value={{songs, fetchSongs}}>
    <div className="App">
      <Grid container direction={'column'} alignItems={'center'} spacing={2}>
      <CDBurningAnimation songs={songs}/>
      <AddSong/>
      <CurrentSongs songs={songs}/>
      </Grid>
    </div>
    </ComponentContext.Provider>
  );
}

export default App;
