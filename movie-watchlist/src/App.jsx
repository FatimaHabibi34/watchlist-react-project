import { useState } from "react";

const App = () => {
  
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("Action");
  const [filter, setFilter] = useState("All");

  
  const addMovie = (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const newMovie = {
      id: crypto.randomUUID(),
      title,
      genre,
      watched: false,
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setGenre("Action");
  };

  const toggleWatched = (id) => {
    setMovies(
      movies.map((movie) =>
        movie.id === id
          ? { ...movie, watched: !movie.watched }
          : movie
      )
    );
  };

  const deleteMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  
  const totalMovies = movies.length;
  const watchedCount = movies.filter((m) => m.watched).length;
  const unwatchedCount = movies.filter((m) => !m.watched).length;

  const filteredMovies = movies.filter((movie) => {
    if (filter === "Watched") return movie.watched;
    if (filter === "Unwatched") return !movie.watched;
    return true;
  });

  
  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>🎬 Watchlist App</h1>

      
      <form onSubmit={addMovie}>
        <input
          type="text"
          placeholder="Movie title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option>Action</option>
          <option>Drama</option>
          <option>Comedy</option>
          <option>Horror</option>
          <option>Animation</option>
          <option>Romantic Comedy</option>
        </select>

        <button type="submit">Add Movie</button>
      </form>

      <hr />

      
      <div>
        <button onClick={() => setFilter("All")}>All</button>
        <button onClick={() => setFilter("Watched")}>Watched</button>
        <button onClick={() => setFilter("Unwatched")}>Unwatched</button>
      </div>

      <hr />

      
      <p>
        Total: {totalMovies} | Watched: {watchedCount} | Unwatched:{" "}
        {unwatchedCount}
      </p>

      
      {filteredMovies.length === 0 && (
        <p>No movies found. Add one!</p>
      )}

      {totalMovies > 0 && watchedCount === totalMovies && (
        <p>🎉 You watched everything!</p>
      )}

      
      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <strong>{movie.title}</strong> ({movie.genre}) —{" "}
            {movie.watched ? "Watched ✅" : "Unwatched ❌"}

            <div>
              <button onClick={() => toggleWatched(movie.id)}>
                Toggle Watched
              </button>
              <button onClick={() => deleteMovie(movie.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
