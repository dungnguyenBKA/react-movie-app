import {useParams} from "react-router-dom";
import useScreenState from "../../hook/useScreenState";
import {useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

function DetailPage() {
  const {id} = useParams();
  const {loading, setLoading, mounted} = useScreenState()
  const [movie, setMovie] = useState()

  async function getMovie() {
    try {
      setLoading(true)
      const url = `http://www.omdbapi.com/?i=${id}&apikey=263d22d8`;
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

  if (!movie) {
    return <div>An Error has Occurred</div>
  }

  return <div className={"row"}>
    <img
      alt={movie.Poster}
      src={movie.Poster}/>
    <div>
      <h1>{JSON.stringify(movie, null, 2)}</h1>
    </div>
  </div>
}

export default DetailPage
