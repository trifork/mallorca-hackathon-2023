export interface PlayerCommand {
  action: 'PlaySongAt' | 'Stop' | 'Seek';
  payload: null | { at: number } | { second: number };
}

export interface PlayerState {
  playlist: Array<any>; // unknown
  playingSong: any; // unknown
  state: 'playing' | 'paused';
  emittedAt: any; //'Whatever timestamp we get once we call Date.now() AS A NUMBER';
}
