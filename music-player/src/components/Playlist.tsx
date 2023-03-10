import React from 'react';  
import { PlayerState, Song } from '../types';


interface PlaylistProps {
    playerState : PlayerState | null;
}
function Playlist({playerState} : PlaylistProps){
  
    const songClasses = "border border-gray-200 p-2 rounded-xl"
    const selectedSongClasses = `${songClasses} font-bold bg-blue-200 `

  return (
    <ul className="space-y-2 ">
    {playerState && playerState.playlist.map(
      (song, index) => {
        const isPlaying= index === playerState.playingSongAt

        return <SongElement song={song}  songClass={isPlaying ? selectedSongClasses : songClasses}/>
      }
    )}
    </ul>

    
  );
}  

interface SongElementProps {
    song: Song
    songClass: string
}

function SongElement({song, songClass} : SongElementProps) {
    return (
        <li key={song.fileName} className={songClass}>{song.fileName}, duration: {song.durationMS / 1000}</li>
    )
}


export default Playlist;