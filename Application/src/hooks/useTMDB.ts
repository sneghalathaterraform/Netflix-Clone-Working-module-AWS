import axios from 'axios'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY
const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE_URL = 'https://image.tmdb.org/t/p/original'
export const IMG_THUMB_URL = 'https://image.tmdb.org/t/p/w500'

const tmdb = axios.create({
  baseURL: BASE_URL,
  params: { api_key: API_KEY, language: 'en-US' }
})

export interface Movie {
  id: number
  title: string
  name?: string
  overview: string
  backdrop_path: string
  poster_path: string
  vote_average: number
  release_date?: string
  first_air_date?: string
  media_type?: string
}

export interface TMDBResponse {
  results: Movie[]
}

export const fetchTrending = () =>
  tmdb.get<TMDBResponse>('/trending/all/week').then(r => r.data.results)

export const fetchNetflixOriginals = () =>
  tmdb.get<TMDBResponse>('/discover/tv', {
    params: { with_networks: 213, sort_by: 'popularity.desc' }
  }).then(r => r.data.results)

export const fetchTopRated = () =>
  tmdb.get<TMDBResponse>('/movie/top_rated').then(r => r.data.results)

export const fetchActionMovies = () =>
  tmdb.get<TMDBResponse>('/discover/movie', {
    params: { with_genres: 28 }
  }).then(r => r.data.results)

export const fetchComedyMovies = () =>
  tmdb.get<TMDBResponse>('/discover/movie', {
    params: { with_genres: 35 }
  }).then(r => r.data.results)

export const fetchHorrorMovies = () =>
  tmdb.get<TMDBResponse>('/discover/movie', {
    params: { with_genres: 27 }
  }).then(r => r.data.results)

export const fetchDocumentaries = () =>
  tmdb.get<TMDBResponse>('/discover/movie', {
    params: { with_genres: 99 }
  }).then(r => r.data.results)

export const searchMovies = (query: string) =>
  tmdb.get<TMDBResponse>('/search/multi', {
    params: { query }
  }).then(r => r.data.results)
