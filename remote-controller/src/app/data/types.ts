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

export interface PlayerState {
  playlist: Array<any>; // unknown
  playingSong: any; // unknown
  state: 'playing' | 'paused';
  emittedAt: any; //'Whatever timestamp we get once we call Date.now() AS A NUMBER';
}
