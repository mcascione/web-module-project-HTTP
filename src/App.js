import React, { useEffect, useState } from "react";

import { Route, Routes, Navigate } from "react-router-dom";
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import EditMovieForm from "./components/EditMovieForm";
import AddMovieForm from "./components/AddMovieForm";
import MovieHeader from './components/MovieHeader';
import FavoriteMovieList from './components/FavoriteMovieList';

import axios from 'axios';

const App = () => {
  const [movies, setMovies] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:9000/api/movies')
      .then(res => {
        setMovies(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const deleteMovie = (id) => {
    setMovies(movies.filter(item => (item.id !== (id))));
    setFavoriteMovies(favoriteMovies.filter(movie => movie.id !== id));
  }

  const addToFavorites = (movie) => {
    setFavoriteMovies([...favoriteMovies, movie]);
  }

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand" > HTTP / CRUD Module Project</span>
      </nav>

      <div className="container">
        <MovieHeader />
        <div className="row ">
          <FavoriteMovieList favoriteMovies={favoriteMovies}/>


          <Routes>
            <Route path="movies/edit/:id" element={<EditMovieForm setMovies={setMovies} setFavoriteMovies={setFavoriteMovies} favoriteMovies={favoriteMovies} />}/>
            <Route path="movies/:id" element={<Movie deleteMovie={deleteMovie} addToFavorites={addToFavorites} favoriteMovies={favoriteMovies} setFavoriteMovies={setFavoriteMovies}/>  }/>
            <Route path="movies/add" element={<AddMovieForm setMovies={setMovies}/>} />
            <Route path="movies" element={<MovieList movies={movies} />} />

            <Route path="/" element={<Navigate to="/movies" />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};


export default App;
