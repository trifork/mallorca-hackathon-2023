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

export interface PlayerState {
  playlist: Array<string>; // list of song urls
  playingSong: string; // playing song url
  state: 'playing' | 'paused';
  emittedAt: Date;
}
