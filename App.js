import React from 'react';
import "./App.css";
import SearchIcon from "./search.svg";
import MovieCard from './MovieCard';
//Using useEffect hook for fetching the data from API
import { useEffect,useState } from 'react';
//Api key:b39cfd03

//Calling the Api key
const API_URL="http://www.omdbapi.com?apikey=b39cfd03";

const App=() => {

    //Create a hook
    const[movies,setmovies]=useState([]);
    const[searchTerm,setsearchTerm]=useState("");
    //Calling the function for fetching the data from API
    const searchMovies = async (title) => {
        const response=await fetch(`${API_URL}&s=${title}`);
        //Getting the data from it
        const data=await response.json();

        setmovies(data.Search);
    }

   useEffect(() => {
      searchMovies("Spiderman");
   },[]);

    return (
        <div className='app'>
        <h1>Movie Buff</h1>
        <div className='search'>
            <input placeholder='Search for movies' value={searchTerm} onChange={(e)=>setsearchTerm(e.target.value)} ></input>
            <img src={SearchIcon} alt="search" onClick={()=>searchMovies(searchTerm)}/>
        </div>

        {
            movies?.length>0
            ?(
               <div className='container'>
                {movies.map((movie)=>(
                    <MovieCard movie={movie}/>
                ))}
            </div>  
            ):(
                <div className='empty'>
                    <h2>No Movies Found</h2>
                </div>
            )
        }
        </div>
    );
}

export default App;