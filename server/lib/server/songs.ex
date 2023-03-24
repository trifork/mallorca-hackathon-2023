defmodule Server.Songs do


  def song_path(song_name) do
    songs_dir_path()
      |> Path.join("#{song_name}")
  end

  def songs_dir_path() do
    Application.app_dir(:server)
      |> Path.join("priv/songs")
  end

  def songs_count() do
    songs_dir_path()
    |> File.ls!()
    |> Enum.count()
  end

  def sanitize_song_filename(filename) do
    filename
    |> String.trim()
    |> String.replace(~r/[^\w\d-_.]/, "_")
  end

  def song_exists?(song_name) do
    songs_dir_path()
    |> File.ls!()
    |> Enum.any?(fn song_path -> String.contains?(song_path, song_name) end)
  end

  def song_duration_millis(song_name) do
    python = Path.join([Application.app_dir(:server), "priv", "venv", "bin", "python3"])
    audio_script = Path.join(["priv", "nif", "audio.py"])
    audio_path = song_path(song_name)
    with {result , 0} <- System.cmd(python, [audio_script, audio_path]),
      {millis, ""} <- Float.parse(String.trim(result)) do
        round(millis)
      else
        _err -> {:error, "Cannot extract song duration"}
    end
  end

  def get_playlist() do
    songs_dir_path()
    |> File.ls!()
    |> Enum.map(fn filename ->
      %{
        "filename" => filename,
        "durationMS" => song_duration_millis(filename)
      }
    end)
  end
end
