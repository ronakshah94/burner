import React, { useEffect, useState} from 'react';
import CDBurningAnimation from './CDBurningAnimation';
import './App.css';

const ComponentContext = React.createContext({
  songs: [], fetchSongs: () => {}
});


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
      <CDBurningAnimation songs={songs}/>
    </div>
    </ComponentContext.Provider>
  );
}

export default App;
