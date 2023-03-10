import React, { useEffect, useState } from 'react';
import './App.css';
import Playlist from './components/Playlist';
import SongPlayer from './components/SongPlayer';
import useApiConnect from './hooks/useApiConnect';
import { PlayerState, Song } from './types';

function App() {
  const playerState: PlayerState | null = useApiConnect();
  const [currentSong, setCurrentSong] = useState<Song | undefined>(undefined)
  useEffect(() => {
    if (playerState?.playingSongAt) {
      setCurrentSong(playerState?.playlist[playerState.playingSongAt]);
    }
  }, [playerState])

  return (
    <div className='flex flex-row py-4 gap-4 h-screen '>
      <div className='w-1/3 pl-4 h-full overflow-auto'>
        <Playlist playerState={playerState}></Playlist>

      </div>
      <div className='flex-grow bg-blue-100'>
        <SongPlayer currentSong={currentSong}></SongPlayer>
      </div>
    </div>

  );
}

export default App;
