import { useEffect, useMemo, useRef, useState } from "react";
import { Song } from "../types";

interface SongPlayerProps {
  currentSong: Song | undefined;
  wrapper: React.RefObject<HTMLDivElement>
}
function SongPlayer({ currentSong, wrapper }: SongPlayerProps) {
  console.count("songplayer")
  //  "http://localhost:8000/api/songs/BoyWithUke - Sick of U (Lyric Video) ft. Oliver Tree [GgT4HhPHU1w].mp3"
  // "http://192.168.1.47:8000/api/songs/BoyWithUke - Sick of U (Lyric Video) ft. Oliver Tree [GgT4HhPHU1w].mp3"
  const apiBaseUrl = "http://192.168.1.47:8000/api/songs"
  const srcLink = `${apiBaseUrl}/${currentSong?.fileName}`

  const WIDTH = wrapper.current?.offsetWidth || 400
  const HEIGHT = 400
  const audioCtx = useMemo(() => new AudioContext(), []);

  const audioRef = useRef<HTMLAudioElement>(null)
  const analyser = useMemo(() => audioCtx.createAnalyser(), [audioCtx]);
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const canvasCtx = useMemo(() => canvasRef.current?.getContext("2d"), [canvasRef.current]);
  const source = useMemo(() => audioRef.current ? audioCtx.createMediaElementSource(audioRef.current) : null, [audioRef.current])
  const [songProgress, setSongProgress] = useState<number | null>(null)

  useEffect(() => {

    if (source && analyser && audioCtx) {

      source.connect(analyser);
      analyser.fftSize = 2048;
      analyser.connect(audioCtx.destination);
    }
  }, [source, analyser, audioCtx])
  const getFrequencyArray = () => {
    if (source) {
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

    }
  }


  function draw() {
    if (!canvasCtx) { return }

    getFrequencyArray();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);

    analyser.getByteFrequencyData(dataArray);

    canvasCtx.fillStyle = "rgba(255, 255, 255,1)";
    canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);

    const barWidth = (WIDTH / bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      barHeight = (dataArray[i] / 255) * HEIGHT;
      canvasCtx.fillStyle = `rgb(${barHeight + 100}, 50, 50)`;
      canvasCtx.fillRect(x, 0, barWidth, barHeight);

      x += barWidth + 1;


    }

    requestAnimationFrame(draw)
  }
  const totalSeconds = currentSong && Math.round(currentSong?.durationMS / 1000)
  const totalMinutes = totalSeconds && Math.floor(totalSeconds / 60)

  const currentSeconds = audioRef.current && Math.round(audioRef.current?.currentTime)
  const currentMinutes = currentSeconds && Math.floor(currentSeconds / 60)
  return (
    <div className="flex flex-col justify-between h-full">
      <div className="text-center font-medium text-xl mt-8">
        <h2>{currentSong?.fileName || "NO SONG"}</h2>
        <div className="w-full">

          <div className="bg-black h-8" style={{ width: `${songProgress}%` }}></div>
          <h3 >{songProgress}</h3>
    <Timer 
    totalSeconds={totalSeconds}
    totalMinutes={totalMinutes}
    currentSeconds={currentSeconds}
    currentMinutes={currentMinutes}/>
        </div>
        <audio onTimeUpdate={(event) => {
          if (!currentSong) { return setSongProgress(null) }
          const audioElement = event.target as HTMLAudioElement
          const progressPercentatge = audioElement.currentTime / (currentSong.durationMS / 1000) * 100
          setSongProgress(progressPercentatge)
        }
        }
          onLoadStart={() => requestAnimationFrame(draw)} ref={audioRef} src={srcLink} autoPlay crossOrigin="anonymous"></audio>
      </div>
      <canvas className="self-end" width={WIDTH} height={HEIGHT} ref={canvasRef}></canvas>
    </div>
  );
}


interface TimerProps {
  totalSeconds: number | undefined
  totalMinutes: number | undefined
  currentSeconds: number | null
  currentMinutes: number | null

}

function Timer({
  totalSeconds,
  totalMinutes,
  currentSeconds,
  currentMinutes, }: TimerProps) {

  if (totalSeconds === undefined || totalMinutes === undefined || currentSeconds === null || currentMinutes === null) { return <></> }


  return <h3> {currentMinutes} minutes and {currentSeconds % 60} seconds / {totalMinutes} minutes and {totalSeconds % 60} seconds</h3>

}

export default SongPlayer;
