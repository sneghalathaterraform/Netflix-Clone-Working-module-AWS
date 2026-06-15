import { useEffect, useState } from 'react'
import { IMG_THUMB_URL, type Movie } from '../hooks/useTMDB'
import './MovieRow.css'

interface Props {
  title: string
  fetchMovies: () => Promise<Movie[]>
  isLarge?: boolean
}

export default function MovieRow({ title, fetchMovies, isLarge }: Props) {
  const [movies, setMovies] = useState<Movie[]>([])
  const [hovered, setHovered] = useState<number | null>(null)

  useEffect(() => {
    fetchMovies().then(setMovies)
  }, [fetchMovies])

  return (
    <section className="row">
      <h2 className="row__title">{title}</h2>
      <div className="row__posters">
        {movies.map(movie => (
          movie.poster_path && (
            <div
              key={movie.id}
              className={`row__poster-wrapper ${hovered === movie.id ? 'row__poster-wrapper--hovered' : ''}`}
              onMouseEnter={() => setHovered(movie.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <img
                className={`row__poster ${isLarge ? 'row__poster--large' : ''}`}
                src={`${IMG_THUMB_URL}${isLarge ? movie.poster_path : movie.backdrop_path}`}
                alt={movie.title || movie.name}
                loading="lazy"
              />
              {hovered === movie.id && (
                <div className="row__poster-info">
                  <p>{movie.title || movie.name}</p>
                  <span>⭐ {movie.vote_average.toFixed(1)}</span>
                </div>
              )}
            </div>
          )
        ))}
      </div>
    </section>
  )
}
