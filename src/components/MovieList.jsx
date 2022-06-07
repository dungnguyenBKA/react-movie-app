import React from 'react';
import {Link} from "react-router-dom";

const MovieList = (props) => {
  const FavouriteComponent = props.favouriteComponent;

  return (
    <>
      {
        props.movies.map((movie, index) => (
          <div
            className='image-container d-flex justify-content-start m-3'>
            <Link
              to={`/movie/${movie.imdbID}`}
              key={index}
            >
              <img
                src={movie.Poster === "N/A" ? "http://mail.aztekcomputers.com/prod_images/pi276/2159187l.jpg" : movie.Poster}
                alt='movie'/>
            </Link>

            <div
              onClick={() => props.handleFavouritesClick(movie)}
              className='overlay d-flex align-items-center justify-content-center'>
              <FavouriteComponent/>
            </div>
          </div>
        ))}
    </>
  );
};

export default MovieList;
