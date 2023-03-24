defmodule ServerWeb.Router do
  alias ElixirSense.Plugins
  use ServerWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, {ServerWeb.LayoutView, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json", "multipart"]
  end

  scope "/", ServerWeb do
    pipe_through :browser

    get "/", PageController, :index
  end

  scope "/api", ServerWeb do
    pipe_through(:api)

    get "/songs/:song_name", SongController, :get_song

    scope "/playlist" do
      post "/songs", SongController, :post_song
    end
  end

  # Other scopes may use custom stacks.
  # scope "/api", ServerWeb do
  #   pipe_through :api
  # end
end
