"use client"
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import { useGetMovieDetails } from '@/utils/apis/get-tv-movies';
import { Link, Play } from 'lucide-react';
import { useParams } from 'next/navigation';
import React from 'react'

/**
 * Functional component for displaying detailed information about a movie.
 * Retrieves movie details based on the provided ID and renders the details including title, poster, release date, tagline, vote average, genres, production companies, and more.
 * Allows users to watch the movie and provides links to the homepage.
 * @returns JSX element representing the movie details view
 */
export default function MovieDetails() {
  const { id } = useParams();
  const { data, isLoading, error } = useGetMovieDetails(id as string);

  if (isLoading) {
      return <Loading/>
  }

  if (error) {
      return <div>An error has occurred while fetching the data.</div>;
  }

  return (
      <div className='flex flex-row items-start justify-between h-screen w-screen'>

          <div className="flex flex-row items-center justify-center justify-items-center gap-10 p-10 w-screen h-screen flex-wrap bg-[#1A1A1A] text-white ">
              <div>
                  <Button className="bg-red-600 hover:bg-red-700 flex items-start">
                      <a href="/">Back</a>
                  </Button>
                  <img src={`https://image.tmdb.org/t/p/w500${data.poster_path}`} alt={data.title}
                      className='rounded-lg object-cover h-fit '
                  />
              </div>
              <div className='flex items-start justify-between flex-col  bg-[#282828] rounded-xl pb-4'>
                  <h1 className="text-white text-start text-3xl uppercase font-bold p-3 hover:text-yellow-500">Title: {data.title}</h1>
                  <div className='flex flex-row items-start p-4 flex-wrap'>
                      <div className='max-w-[500px]'>
                          <div className='flex flex-col'>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Release Date: {data.release_date}</span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Tagline: <span className='text-slate-300'>{data.tagline}</span></span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Vote Average: <span className='text-slate-300'>{data.vote_average}</span></span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Vote Count: <span className='text-slate-300'>{data.vote_count}</span></span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Genres: <span className='text-slate-300'>{data.genres.map((genre: { name: any; }) => genre.name).join(', ')}</span></span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Production Companies: <span className='text-slate-300'>{data.production_companies.map((company: { name: any; }) => company.name).join(', ')}</span></span>
                              <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Production Countries:  <span className='text-slate-300'>{data.production_countries.map((country: { name: any; }) => country.name).join(', ')}</span></span>
                          </div>
                      </div>
                      <div className='flex flex-col items-start'>

                          <p className='text-white text-start text-md font-thin p-5 hover:text-yellow-500 max-w-[400px]'><h3 className="uppercase text-yellow-500 font-bold text-xl">description:</h3> {data.overview}</p>
                          <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Popularity: <span className='text-slate-300'>{data.popularity}</span></span>
                          <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Budget: <span className='text-slate-300'>{data.budget}</span></span>
                          <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Revenue: <span className='text-slate-300'>{data.revenue}</span></span>
                          <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Original Language: <span className='text-slate-300'>{data.original_language}</span></span>
                          <span className='text-white text-start text-lg font-bold p-3 hover:text-yellow-500'>Runtime: <span className='text-slate-300'>{data.runtime}</span> minutes</span>
                      </div>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700 m-4">
                      <Play className="mr-2 h-4 w-4 " /> <a className="font-bold text-lg" href={data.homepage}>Watch Now</a>
                  </Button>

              </div>
          </div>
      </div>
  );
}