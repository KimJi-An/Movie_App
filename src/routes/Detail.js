import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState();
  // 현재 페이지로 movie id 받아오기
  const getMovie = async() => {
    const json = await(
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };
  useEffect(() => {
    getMovie();
  }, []);
  return (
    <div>
      {loading ? (
        <div className={styles.loader}>
          <span>Loading...</span>
        </div>
      ) : (
        <div className={styles.movie}>
          <img src={movie.large_cover_image} alt={movie.title} />
          <div className={styles.info}>
            <span>{movie.title}</span>
            <ul className={styles.basic_info}>
              <li>개봉연도 : {movie.year}</li>
              <li>평점 : {movie.rating}</li>
              <li>상영시간 : {movie.runtime}분</li>
              <li>장르 : &nbsp;
                <ul className={styles.genres}>
                  {movie.genres.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
              </li>
              {/* <hr/> */}
            </ul>
          </div>
          <p className={styles.description}>{movie.description_full}</p>
        </div>
      )}
    </div>
  );
}

export default Detail;