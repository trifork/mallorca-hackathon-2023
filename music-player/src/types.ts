export interface PlayerState {
    playlist: Array<Song>,
    state: "stop" | "paused" | "playing",
    emittedAt: number
    playingSongAt?: number
}

export interface Song {
    fileName: string,
    durationMS: number,
    src: string
}