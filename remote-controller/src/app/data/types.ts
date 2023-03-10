export interface PlaySongAtCommand {
  action: 'PlaySongAt';
  payload: null;
  emittedAt: Date;
}

export interface StopCommand {
  action: 'Stop';
  payload: { at: number };
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
  playlist: Array<Song>; // unknown
  playingSong: string; // unknown
  state: 'playing' | 'paused';
  emittedAt: Date;
}
