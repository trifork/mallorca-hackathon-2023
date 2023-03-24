defmodule ServerWeb.PlaylistChannel do
  use ServerWeb, :channel

  alias Server.Player.PlayerStateServer

  @impl true
  def join("playlist:*", payload, socket) do
    if authorized?(payload) do
      with {:ok, state} <- PlayerStateServer.get_current_state() do
        {:ok, state, socket}
      else
        {:error, reason} -> {:error, reason}
      end
    else
      {:error, %{reason: "unauthorized"}}
    end
  end

  # Channels can be used in a request/response fashion
  # by sending replies to requests from the client
  @impl true
  def handle_in("PlaySongAt", %{"at" => song_index}, socket) do
    with :ok <- PlayerStateServer.play_song_at(song_index) do
      {:noreply, socket}
    else
      error -> {:reply, error, socket}
    end
  end

  @impl true
  def handle_in("Stop", %{"emittedAt" => emitted_at}, socket) do
    with :ok <- PlayerStateServer.pause_song(emitted_at) do
      {:noreply, socket}
    else
      error -> {:reply, error, socket}
    end
  end

  # It is also common to receive messages from the client and
  # broadcast to everyone in the current topic (playlist:lobby).
  @impl true
  def handle_in("shout", payload, socket) do
    broadcast(socket, "shout", payload)
    {:noreply, socket}
  end

  # Add authorization logic here as required.
  defp authorized?(_payload) do
    true
  end
end
