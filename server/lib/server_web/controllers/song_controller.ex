defmodule ServerWeb.SongController do
  use ServerWeb, :controller

  alias Server.Songs

  def get_song(conn, %{"song_name" => song_name} = _params) do
    file_path = Songs.song_path(song_name)

    if File.exists?(file_path) do
      conn
      |> send_file(200, file_path)
    else
      conn
      |> send_resp(:not_found, "")
    end
  end

  def post_song(conn, %{"song_file" => %Plug.Upload{} = song_file} = params) do
    sanitized_filename = Songs.sanitize_song_filename(song_file.filename)
    exists? = Songs.song_exists?(sanitized_filename)

    upload_song(conn, params, exists?)
  end

  defp upload_song(conn, %{"song_file" => %Plug.Upload{} = song_file}, true = _song_exists) do
    conn
    |> send_resp(:conflict, "")
  end

  defp upload_song(conn, %{"song_file" => %Plug.Upload{} = song_file}, false = _song_exists) do
    songs_count = Songs.songs_count()

    sanitized_filename = Songs.sanitize_song_filename(song_file.filename)
    saved_filename = "#{songs_count}_#{sanitized_filename}"
    destination_path = Songs.song_path(saved_filename)

    with :ok <- File.cp(song_file.path, destination_path) do
      conn
      |> put_status(:created)
      |> json(%{"song-name" => saved_filename})
    else
      {:error, posix} ->
        conn
        |> put_status(500)
        |> json(%{"reason" => posix})
    end
  end



end
