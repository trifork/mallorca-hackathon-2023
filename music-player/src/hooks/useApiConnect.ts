import { useEffect, useState } from "react";
import { PlayerState } from "../types";

function useApiConnect() {
    const [playerState, setPlayerState] = useState<PlayerState | null>(null)

    useEffect(() => {
        // const ws = new WebSocket("ws://192.168.1.112:8080");
        const ws = new WebSocket("ws://192.168.1.47:8000/api/playlist");

        ws.onopen = (event) => {
            console.log(event)
        };

        ws.onmessage = function (event) {
            console.log(`[message] Data received from server: ${event}`);
            try {
                let playerState: PlayerState = JSON.parse(event.data) as PlayerState;

                playerState = {...playerState,
                    playingSongAt: 5,
                    state: "playing"
                
                }
                
                console.log(playerState.playingSongAt, playerState.state, "A")
                setPlayerState(playerState)
            } catch (err) {
                // whatever you wish to do with the err
            }

        };

    }, [])



    return playerState
}

export default useApiConnect



