export interface PlaySongAtCommand {
  action: 'PlaySongAt';
  payload: {
    playSongAt: number;
    seek?: number;
  };
  emittedAt: Date;
}

export interface StopCommand {
  action: 'Stop';
  payload: null;
  emittedAt: Date;
}

export interface SeekCommand {
  action: 'Seek';
  payload: { second: number };
  emittedAt: Date;
}

export interface VolumeCommand {
  action: 'SetVolume';
  payload: { volume: number };
  emittedAt: Date;
}
export interface Song {
  fileName: string;
  durationMS: number;
  src: string;
}
export interface PlayerState {
  playlist: Array<Song>;
  playingSongAt: number | undefined;
  seek: number | undefined;
  state: 'playing' | 'paused';
  emittedAt: Date;
}
