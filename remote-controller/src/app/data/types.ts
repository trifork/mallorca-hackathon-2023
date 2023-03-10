export interface PlaySongAtCommand {
  action: 'PlaySongAt';
  payload: null;
}
export interface StopCommand {
  action: 'Stop';
  payload: { at: number };
}
export interface SeekCommand {
  action: 'Seek';
  payload: { second: number };
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
  emittedAt: number; //'Whatever timestamp we get once we call Date.now() AS A NUMBER';
}
