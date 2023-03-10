import { useEffect, useRef } from "react";
import { Song } from "../types";

interface SongPlayerProps {
  currentSong: Song | undefined;
}
function SongPlayer({ currentSong }: SongPlayerProps) {
  //  "http://localhost:8000/api/songs/BoyWithUke - Sick of U (Lyric Video) ft. Oliver Tree [GgT4HhPHU1w].mp3"
  // "http://192.168.1.47:8000/api/songs/BoyWithUke - Sick of U (Lyric Video) ft. Oliver Tree [GgT4HhPHU1w].mp3"
  // const apiBaseUrl = "http://192.168.1.47:8000/api/songs/"
  const srcLink = currentSong?.src.replace("localhost:4200", "192.168.1.47:8000")

  // const audioCtx = new AudioContext();

  // const audioRef = useRef(null)

  // useEffect(() => {
  //   if (audioRef.current) {
  //     console.log(audioRef.current)
  //     // Feed the HTMLMediaElement into it
  //     const source = audioCtx.createMediaElementSource(audioRef.current)

  //     // Create a gain node
  //     const gainNode = audioCtx.createGain();
  //     console.log(source, gainNode)
  //   }
  // }, [audioRef.current, audioCtx])

  return (
    <div>
      <h1> Current Song: </h1>
      <h2>{currentSong?.fileName || "NO SONG"}</h2>
      <audio controls src={srcLink} autoPlay ></audio>
      <div>

      </div>
    </div>
  );
}

export default SongPlayer;
