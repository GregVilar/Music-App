import logo from "./logo.svg";
import "./App.css";
import { Children, useEffect, useState } from "react";
import { Card } from "react-bootstrap";

// const tempMusicData = [
//   {
//     id: 1,
//     title: "Song 1",
//     artist: "Artist A",
//     genre: "Pop",
//   },
//   {
//     id: 2,
//     title: "Song 2",
//     artist: "Artist B",
//     genre: "Rock",
//   },
//   {
//     id: 3,
//     title: "Song 3",
//     artist: "Artist C",
//     genre: "Jazz",
//   },
// ];
// const tempPlaylist = [
//   {
//     id: 1,
//     title: "Song 1",
//     artist: "Artist A",
//     genre: "Pop",
//   },
//   {
//     id: 2,
//     title: "Song 2",
//     artist: "Artist B",
//     genre: "Rock",
//   },
//   {
//     id: 3,
//     title: "Song 3",
//     artist: "Artist C",
//     genre: "Jazz",
//   },
// ];

//Make component reusable as possible
//Separate logic from ui
//Make our component simple
//Coding style

//stateful component
//stateless component
//structural component

const CLIENT_ID = "e527cafd7a104036b5627bf9d08fac0e";
const CLIENT_SECRET = "0e9a79917d2d4f57949318dad796c81e";

function NavigationBar({ children }) {
  return (
    <nav className="container-nav">
      <Logo />
      {children}
    </nav>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Appol Music</h1>;
}

function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Search({ setMusic }) {
  const [query, setQuery] = useState("");
  const [accessToken, setAccessToken] = useState("");

  useEffect(() => {
    const authParameter = {
      method: "POST",
      headers: { "Content-type": "application/x-www-form-urlencoded" },
      body: `grant_type=client_credentials&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`,
    };
    fetch("https://accounts.spotify.com/api/token", authParameter)
      .then((result) => result.json())
      .then((data) => setAccessToken(data.access_token));
  }, []);

  async function search() {
    const trackParameters = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    };

    fetch(
      `https://api.spotify.com/v1/search?q=${query}&type=track&limit=50`,
      trackParameters
    )
      .then((result) => result.json())
      .then((data) => setMusic(data.tracks.items));
  }

  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && search()}
    />
  );
}

function SortMusic({ handleSortChange }) {
  return (
    <div className="container-sort">
      <label className>Sort By: </label>
      <select id="sort" onChange={handleSortChange}>
        <option value="artist">Artist</option>
        <option value="low">Popularity ↘️</option>
        <option value="high">Popularity ↗️</option>
      </select>

      <div className="logow">🍎</div>
    </div>
  );
}

function Music({ music, playlist, addToPlaylist, removeToPlaylist }) {
  const managePlaylist = (track) => {
    if (playlist.some((m) => m.id === track.id)) {
      removeToPlaylist(track);
    } else {
      addToPlaylist(track);
    }
  };

  return (
    <ul>
      {music.map((track) => (
        <div className="card-header" key={track.id}>
          <div className="card">
            <img src={track.album.images[1].url} alt="Album_Image" />
          </div>
          <div className="card-text">{track.name}</div>
          <div className="card-artist">{track.artists[0].name}</div>
          <button
            className={playlist.some((m) => m.id === track.id) ? "Clicked" : ""}
            onClick={() => managePlaylist(track)}
          >
            {playlist.some((m) => m.id === track.id) ? (
              <span>🍏</span>
            ) : (
              <span>🍎</span>
            )}
          </button>
        </div>
      ))}
    </ul>
  );
}

function Playlist({ playlist, removeToPlaylist }) {
  return (
    <div>
      {playlist.map((track) => (
        <div className="card-header" key={track.id}>
          <div className="card">
            <img src={track.album.images[1].url} alt="Album_Image" />
          </div>
          <div className="card-text">{track.name}</div>
          <div className="card-artist">{track.artists[0].name}</div>
          <button onClick={() => removeToPlaylist(track)}>
            <span>🍎</span>
          </button>
        </div>
      ))}
    </div>
  );
}

function Box({ children, title }) {
  return (
    <div className="container-title">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function MainComponent({ children }) {
  return <div className="container">{children}</div>;
}

function App() {
  const [music, setMusic] = useState([]);
  const [playlist, setPlaylist] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  const sortedFilteredMusic = () => {
    let filteredMusic = music;
    if (searchQuery) {
      filteredMusic = filteredMusic.filter((track) => {
        return (
          track.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          track.artists[0].name
            .toLowerCase()
            .includes(searchQuery.toLowerCase())
        );
      });
    }

    return filteredMusic.sort((a, b) => {
      switch (sortOption) {
        case "artist":
          return (a.artists[0].name ?? "").localeCompare(
            b.artists[0].name ?? ""
          );
        case "low":
          return a.popularity - b.popularity;
        case "high":
          return b.popularity - a.popularity;
        default:
          return 0;
      }
    });
  };

  const addToPlaylist = (track) => {
    if (!playlist.some((m) => m.id === track.id)) {
      setPlaylist([...playlist, track]);
    }
  };

  const removeToPlaylist = (track) => {
    setPlaylist(playlist.filter((m) => m.id !== track.id));
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <div>
      <NavigationBar>
        <NumResult music={music} />
        <Search setMusic={setMusic} />
      </NavigationBar>
      <h1 className="Center-text">An Appol A Day, Keeps the Mansanas Away</h1>
      <SortMusic handleSortChange={handleSortChange} />
      <MainComponent>
        <Box title="Music List">
          <Music
            music={sortedFilteredMusic()}
            playlist={playlist}
            addToPlaylist={addToPlaylist}
            removeToPlaylist={removeToPlaylist}
          />
        </Box>
        <Box title="Playlist">
          <Playlist playlist={playlist} removeToPlaylist={removeToPlaylist} />
        </Box>
      </MainComponent>
    </div>
  );
}

export default App;
