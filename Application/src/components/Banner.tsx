import { useEffect, useState } from 'react'
import { fetchTrending, IMG_BASE_URL, type Movie } from '../hooks/useTMDB'
import './Banner.css'

export default function Banner() {
  const [movie, setMovie] = useState<Movie | null>(null)
  const [truncated, setTruncated] = useState(false)

  useEffect(() => {
    fetchTrending().then(results => {
      const random = results[Math.floor(Math.random() * results.length)]
      setMovie(random)
    })
  }, [])

  if (!movie) return <div className="banner banner--loading" />

  const overview = movie.overview.length > 200
    ? movie.overview.slice(0, 200) + '...'
    : movie.overview

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(${IMG_BASE_URL}${movie.backdrop_path})`
      }}
    >
      <div className="banner__overlay" />
      <div className="banner__content">
        <h1 className="banner__title">
          {movie.title || movie.name}
        </h1>
        <p className="banner__description">
          {truncated ? movie.overview : overview}
          {movie.overview.length > 200 && (
            <button
              className="banner__more"
              onClick={() => setTruncated(t => !t)}
            >
              {truncated ? ' Less' : ' More'}
            </button>
          )}
        </p>
        <div className="banner__buttons">
          <button className="banner__btn banner__btn--play">▶ Play</button>
          <button className="banner__btn banner__btn--info">ℹ More Info</button>
        </div>
      </div>
      <div className="banner__fade" />
    </header>
  )
}
