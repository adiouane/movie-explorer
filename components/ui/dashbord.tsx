"use client";
import { useState, useEffect } from 'react';
import { usefetchPopularMovies, useSearchMovies } from '@/utils/apis/get-tv-movies';
import Image from "next/image";
import Hero from './hero';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import Loading from './loading';
import Link from 'next/link';
import { Button } from './button';
import Footer from './footer';

/**
 * Functional component for the Streaming Platform Dashboard.
 * Manages movie data, search functionality, loading states, and UI rendering.
 */

export default function StreamingPlatformDashboard() {
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState([]);  // State to hold all movies
    const [search, setSearch] = useState("");
    const [loadingMore, setLoadingMore] = useState(false); // Add loading state for scroll-based loading
    const fetchPopularMovies = usefetchPopularMovies(page);
    const searchMovies = useSearchMovies(search, page);

    // Append new movies to the old list
    useEffect(() => {
        if (fetchPopularMovies.data?.data && !search) {
            setMovies((prevMovies : any) => [...prevMovies, ...fetchPopularMovies?.data?.data] as any);
            setLoadingMore(false); // Reset loading state after data is fetched
        }
    }, [fetchPopularMovies.data]);
    console.log("searchMovies -> searchMovies", searchMovies)


    // Search movies
    useEffect(() => {
        if (!search) return;
        if (searchMovies.data) {
            setMovies(searchMovies.data);
        }
    }, [searchMovies.data]);

    if (fetchPopularMovies.isLoading || searchMovies.isLoading) {
        return (<Loading />);
    }

    if (fetchPopularMovies.error || searchMovies.error) {
        return (
            <div className="flex justify-center items-center h-screen w-full bg-[#1A1A1A] text-white">
                <h1>Error fetching data</h1>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center 
        bg-[#1A1A1A] text-white  overflow-x-hidden overflow-y-scroll md:p-20 rounded-lg sm:p-8">
            <main className='w-full'>
                <Hero />
                <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-center mb-4 flex-col sm:flex-row gap-10">
                        <h1 className="text-3xl font-semibold">Top watched Movies</h1>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            type="text"
                            placeholder="Search"
                            className="text-black font-bold text-xl p-2 bg-white sm:w-80 rounded-md mb-10 w-full"
                        />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-y-10 gap-x-5 place-content-center items-center">
                        {movies && movies.map((Tv: any, index: any) => (
                            <div key={index} className="flex flex-col items-center justify-between bg-[#282828] rounded-xl mb-10 pb-10
                            
                            ">
                                <Dialog>
                                    <DialogTrigger>
                                        <Image
                                            src={`https://image.tmdb.org/t/p/w500${Tv.poster_path}`}
                                            alt={Tv.title}
                                            className="rounded-md object-cover w-full h-96 sm:h-96 md:h-96 lg:h-96 xl:h-96 2xl:h-96
                                            "
                                            loading='lazy'
                                            width={500}
                                            height={750}
                                        />
                                        <h1 className="text-white text-start text-lg font-bold p-3 line-clamp-1 text-clip hover:text-yellow-500">
                                            {Tv.name || Tv.title}
                                        </h1>
                                        <p className="text-gray-400 text-md line-clamp-1 text-start p-2 pb-0">{Tv.overview}</p>
                                    </DialogTrigger>

                                    <DialogContent className="bg-[#1A1A1A] text-white font-thin rounded-md p-3 overflow-auto">
                                        <DialogHeader>
                                            <DialogTitle>
                                                <h1 className="text-white text-start text-2xl font-bold bg-[#525252] rounded-md p-3">
                                                    Overview
                                                </h1>
                                                <h3 className="text-start text-xl font-thin pt-3 pl-3 text-yellow-500">
                                                    <span className="text-white font-semibold text-xl">Title:</span> {Tv.name || Tv.title}
                                                </h3>
                                            </DialogTitle>
                                            <DialogDescription>
                                                <p className="text-gray-400 text-lg text-start p-3">
                                                    <span className="text-white font-semibold">Description:</span> {Tv.overview}
                                                </p>
                                                <Link href={`/movie/${Tv.id}`}>
                                                    <p className="text-white text-lg text-center font-semibold p-2 bg-slate-500 rounded-md">
                                                        View more
                                                    </p>
                                                </Link>
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        ))}
                    </div>
                    {(fetchPopularMovies.isLoading || searchMovies.isLoading) && <Loading />}
                    { searchMovies.data?.length === 0 && search && (
                        <div className="flex justify-center items-center h-96 w-full
                        bg-[#1A1A1A] text-white">
                            <h1>No movies found</h1>
                        </div>
                    )}
                    {
                        movies.length > 0 && !search && (
                            <div className="flex justify-center items-center p-4 ">
                                <Button
                                    onClick={() => {
                                        setPage((prevPage) => prevPage + 1);
                                        setLoadingMore(true);
                                    }}
                                    disabled={loadingMore}
                                    className='bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
                                >
                                    {loadingMore ? "Loading..." : "Load more"}
                                </Button>
                            </div>
                        )
                    }
                </div>
                <Footer />
            </main>

        </div>
    );
}
