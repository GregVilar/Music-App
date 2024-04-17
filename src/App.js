import logo from "./logo.svg";
import "./App.css";
import { Children, useState } from "react";

const tempMusicData = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist A",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist B",
    genre: "Rock",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist C",
    genre: "Jazz",
  },
];
const tempPlaylist = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist A",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist B",
    genre: "Rock",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist C",
    genre: "Jazz",
  },
];

//Make component reusable as possible
//Separate logic from ui
//Make our component simple
//Coding style

function NavigationBar({ children }) {
  return (
    <nav className="container-nav">
      <Logo />
      <Search />
      {children}
    </nav>
  );
}

function Logo() {
  return <h1 style={{ textAlign: "center" }}>Music App</h1>;
}

function NumResult({ music }) {
  return (
    <p>
      Found <strong>{music.length}</strong> results
    </p>
  );
}

function Search() {
  const [query, setQuery] = useState("");
  return (
    <input
      className="search"
      type="text"
      placeholder="Search music..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

function Music({ music }) {
  return (
    <>
      <h2>Music List</h2>
      <ul>
        {music.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist} ({music.genre})<button>♥️</button>
          </li>
        ))}
      </ul>
    </>
  );
}

// function MusicListBox({ music }) {
//   return (
//     <div className="container">
//       <h2>Music List</h2>
//       <Music music={music} />
//     </div>
//   );
// }

function Playlist() {
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const addToPlaylist = (music) => {
    setPlaylist([...playlist, music]);
  };
  return (
    <>
      <h2>Playlist</h2>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
          </li>
        ))}
      </ul>
    </>
  );
}

function Box({ children, title }) {
  return (
    <div>
      <div className="container">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
}

// function PlaylistBox() {
//   return (
//     <div className="container">
//       <h2>Playlist</h2>
//       <Playlist />
//     </div>
//   );
// }

function MainComponent({ children }) {
  return (
    <div>
      <div className="container">{children}</div>
    </div>
  );
}

function App() {
  const [music, setMusic] = useState(tempMusicData);
  return (
    <div>
      <NavigationBar>
        <NumResult music={music} />
      </NavigationBar>
      <MainComponent>
        <Box>
          <Music music={music} />
        </Box>

        <Box>
          <Playlist />
        </Box>
      </MainComponent>
    </div>
  );
}

export default App;

//stateful component
//stateless component
//structural component
