import { useParams } from "react-router-dom";
import useScreenState from "../../hook/useScreenState";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function DetailPage() {
  const { id } = useParams();
  const { loading, setLoading, mounted } = useScreenState()
  const [movie, setMovie] = useState()

  async function getMovie() {
    try {
      setLoading(true)
      const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;
      console.log(url);
      const response = await fetch(url);
      const responseJson = await response.json();
      if (mounted) {
        setMovie(responseJson)
      }
    } catch (e) {
      setMovie(undefined)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovie().finally(() => {
    })
  }, [])

  if(loading) {
    return <div>Loading</div>
  }

  if (!movie) {
    return <div>An Error has Occurred</div>
  }

  return (
    <div className="row mt-50" >
      <div className="col-3 center ml-15">
        <img className="movie-img"
          alt={movie.Poster}
          src={movie.Poster}
        />
        <ul className="btn-block d-flex list-unstyled justify-content-center">
          <li className="item">
            <a className="btn btn-primary mar-5">Trailer</a>
          </li>
          <li className="item">
            <a className="btn btn-danger mar-5">Watch</a>
          </li>
        </ul>
      </div>
      <div className="col-8">
        <h1 className="color-yellow">{movie.Title}</h1>
        <p className="text-opa">Released: <span className="color-aqua">{movie.Released}</span></p>
        <p className="text-opa">Director: <span className="color-aqua">{movie.Director}</span></p>
        <p className="text-opa">Country: <span className="color-aqua">{movie.Country}</span></p>
        <p className="text-opa">Year: <span className="color-aqua">{movie.Year}</span></p>
        <p className="text-opa">Duration: <span className="color-aqua">{movie.Runtime}</span></p>
        <p className="text-opa">Language: <span className="color-aqua">{movie.Language}</span></p>
        <p className="text-opa">Category: <span className="color-aqua">{movie.Genre}</span></p>
        <p className="text-opa">IMDB: <span className="color-yellow">{movie.imdbRating}</span></p>
        <br />
        <p className="plot">{movie.Plot}</p>
      </div>
    </div>
  )

}

export default DetailPage
