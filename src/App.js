import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import MovieList from './components/OmdbAPI/MovieList';
import MovieListHeading from './components/OmdbAPI/MovieListHeading';
import AddFavourite from './components/OmdbAPI/AddFavourite';
import RemoveFavorites from './components/OmdbAPI/RemoveFavorites';
import NewsAPI from './components/NewsAPI/NewsApiListing';
import WeatherForecast from './components/OpenWeatherMapAPI/WeatherForecast';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favourites, setFavourites] = useState([]);
  
  const getMovieRequest = async (searchValue) => {
   
    const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

    const url = `http://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.REACT_APP_TMDB_API_KEY}`

    const response = await fetch(url);

    const responseJson = await response.json();

    if(responseJson.results){
      setMovies(responseJson.results);
    }
  };

  const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);

  }




  const RemoveFavoriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);

  }

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);
  

  useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
    if(movieFavourites){
      setFavourites(movieFavourites);
    }
	}, []);

	return (
		<div className='container-fluid mr-2 ml-2'>
      <h1>My Local DashBoard</h1>

      <div className="col-md-12 row">

        <div className="pull-left col-md-10 col-xs-12">
        <NewsAPI />
      </div>
      
        <div className="pull-right col-md-2 col-xs-12">
        <WeatherForecast />
      </div>
    </div>
     
   
			<div className='row  align-items-center mt-4 mb-4 mr-2 ml-2'>
				<MovieListHeading heading='Movies' />

			</div>
			<div className='row'>
        <MovieList movies={movies} 
        favouriteComponent={AddFavourite} 
        handleFavouritesClick={addFavouriteMovie}
        />
      
			</div>
      <div className='row  align-items-center mt-4 mb-4'>
				<MovieListHeading heading='Favourites' />
			</div>
			<div className='row'>
        <MovieList 
        movies={favourites} 
        favouriteComponent={AddFavourite} 
        handleFavouritesClick={RemoveFavoriteMovie}
        
        />
			</div>
     
		</div>
	);
};

export default App;
