import MovieCard from "../components/MovieCard"
import { useState, useEffect } from "react";
// import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css"
import { getPopularMovies, searchMovies } from "../services/api";

function Home(){

    const [searchQuery, setSearchQuery] = useState("");
   const [movies, setMovies] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true)

   useEffect(()=>{
    const loadPopularMovies = async() => {
        try{ 
            const popularMovies = await getPopularMovies()
            setMovies (popularMovies)

        } catch(err){
            console.log(err)
            setError("Failed to load")
        }
        finally{
            setLoading(false)
        }
    }
    loadPopularMovies()
   },[])

    const handleSearch = async (e)=>{
        e.preventDefault();
        if (!searchQuery.trim()) return 
        if(loading) return
        setLoading(true);
        // alert(searchQuery);
        try{ 
            const movies = await searchMovies(searchQuery)
            setMovies (movies)

        } catch(err){
            console.log(err)
            setError("Failed to load")
        }
        finally{
            setLoading(false)
        }

    }

    return (
    <div className="home">
        <form onSubmit ={handleSearch} className="search-form">
            <input 
            type = "text"
            placeholder="Search For Movies..." 
            className="search-input"
            value = {searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button 
            type="submit"
            className="search-button">Search
            </button>
        </form>
        <div className="movies-grid">
            {movies && movies.map((movie) => (
            <MovieCard movie = {movie} key = {movie.id}/>
            ))}
        </div>
    </div>
);
}

export default Home