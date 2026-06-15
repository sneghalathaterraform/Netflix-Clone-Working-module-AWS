import Navbar from './components/Navbar'
import Banner from './components/Banner'
import MovieRow from './components/MovieRow'
import {
  fetchNetflixOriginals,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies,
  fetchHorrorMovies,
  fetchDocumentaries,
} from './hooks/useTMDB'

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <Banner />
      <main className="app__rows">
        <MovieRow title="Netflix Originals" fetchMovies={fetchNetflixOriginals} isLarge />
        <MovieRow title="Top Rated" fetchMovies={fetchTopRated} />
        <MovieRow title="Action" fetchMovies={fetchActionMovies} />
        <MovieRow title="Comedy" fetchMovies={fetchComedyMovies} />
        <MovieRow title="Horror" fetchMovies={fetchHorrorMovies} />
        <MovieRow title="Documentaries" fetchMovies={fetchDocumentaries} />
      </main>
    </div>
  )
}
