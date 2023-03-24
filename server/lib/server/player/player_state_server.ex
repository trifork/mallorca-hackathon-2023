defmodule Server.Player.PlayerStateServer do
  use GenServer

  alias Server.Songs

  @me __MODULE__

  defmodule State do
    defstruct offset: 0, song_index: 0, start_timestamp: nil, timer: nil
  end

  ### client functions
  def start_link(_params) do
    GenServer.start_link(__MODULE__, nil, name: @me)
  end

  def get_current_state() do
    GenServer.call(@me, :current_state)
  end

  def play_song_at(song_index) do
    if Songs.songs_count() > song_index do
      song_duration_millis = Songs.get_playlist()
      |> Enum.at(song_index)
      |> Map.get("durationMS")

      GenServer.cast(@me, {:play_song_at, song_index, song_duration_millis})
    else
      {:error, "Index out of bounds"}
    end
  end

  def pause_song(emitted_at) do
    GenServer.cast(@me, {:pause_song, emitted_at})
  end


  #### GenServer functions
  @impl true
  def init(nil) do
    {:ok, %State{}}
  end

  @impl true
  def handle_cast({:play_song_at, song_index, song_duration_millis}, state) do
    ts = :os.system_time(:millisecond)
    timer = Process.send_after(self(), {:song_finished, song_index}, song_duration_millis)
    new_state = %State{state | song_index: song_index, start_timestamp: ts, timer: timer}

    ServerWeb.Endpoint.broadcast("playlist:*", "player_state", player_state(new_state))

    {:noreply, new_state}
  end

  @impl true
  def handle_cast({:pause_song, emitted_at}, state) do
    Process.cancel_timer(state.timer)

    new_state = %State{state | offset: state.offset + (emitted_at - state.start_timestamp), timer: nil}

    ServerWeb.Endpoint.broadcast("playlist:*", "player_state", player_state(new_state))

    {:noreply, new_state}
  end

  @impl true
  def handle_call(:current_state, _from, state) do
    {:reply, {:ok, player_state(state)}, state}
  end

  def handle_info({:song_finished, song_index}, state) do
    song_count = Songs.songs_count()
    next_index = rem(song_index + 1, song_count)
    new_state = %State{state | song_index: next_index, timer: nil}

    ServerWeb.Endpoint.broadcast("playlist:*", "player_state", player_state(new_state))
    {:noreply, new_state}
  end


  defp player_state(%State{} = state) do
    playlist = Songs.get_playlist()
    formatted_state = if is_nil(state.timer) do
      "paused"
    else
      "playing"
    end

    %{
      "playlist" => playlist,
      "playingSong" => Enum.at(playlist, state.song_index),
      "state" => formatted_state,
      "emittedAt" => :os.system_time(:millisecond),
      "playingSongOffsetMillis" => state.offset
    }
  end

end
