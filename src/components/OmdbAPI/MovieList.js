const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;
	

	
	return (
		<>
			{props.movies.map((movie, index) => (
				
				<div className='image-container d-flex justify-content-start m-3 col-md-3 ml-2 col-lg-1 col-xs-2 col-sm-3'>
					<img src={'https://image.tmdb.org/t/p/w154/' + movie.poster_path} alt='movie' className="img-responsive" ></img>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay d-flex align-items-center justify-content-center col-md-3'>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;