import React, {useCallback, useEffect, useState} from "react";
import useScreenState from "../../hook/useScreenState";
import MovieListHeading from "../../components/MovieListHeading";
import SearchBox from "../../components/SearchBox";
import MovieList from "../../components/MovieList";
import AddFavourites from "../../components/AddFavourites";
import RemoveFavourites from "../../components/RemoveFavourites";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../App.css';

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const {setLoading, loading} = useScreenState()

  const getMovieRequest = useCallback(async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

    try {
      setLoading(true)
      const response = await fetch(url);
      const responseJson = await response.json();
      if (responseJson.Search) {
        setMovies(responseJson.Search);
      } else {
        setMovies([])
      }
    } catch (e) {
      setMovies([])
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeOut = setTimeout(() => {
      getMovieRequest(searchValue).finally(() => {
      })
    }, 500)

    return () => {
      clearTimeout(timeOut)
    }
  }, [searchValue, getMovieRequest]);

  useEffect(() => {
    return () => {

    }
  }, [])

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem('react-movie-app-favourites')
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
  };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Movies'/>
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue}/>
      </div>
      <div
        className='row'
        style={{
          overflowY: 'hidden'
        }}
      >
        {
          loading ?
            <div>Loading...</div>
            :
            movies.length === 0 ?
              searchValue.length === 0 ? <div>Search in search bar</div> : <div>No Result for {searchValue}</div>
              :
              <MovieList
                movies={movies}
                handleFavouritesClick={addFavouriteMovie}
                favouriteComponent={AddFavourites}/>
        }
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='Favourites'/>
      </div>
      <div className='row'>
        {
          favourites.length === 0 ?
            <div>Add movie to Favourite</div>
            :
            <MovieList
              movies={favourites}
              handleFavouritesClick={removeFavouriteMovie}
              favouriteComponent={RemoveFavourites}/>
        }

      </div>
    </div>
  );
}

export default HomePage
