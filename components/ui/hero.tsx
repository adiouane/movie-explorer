import React from 'react'
import { Button } from './button'
import { Play } from 'lucide-react'

export default function Hero() {
  return (
    <>
       <div className="relative  overflow-hidden mb-8 p-2">
                    <img
                        src="/images/tvshow.jpg"
                        alt="tv show and movie explore"
                        className="w-full h-[550px] object-cover  rounded-xl"
                    />
                    <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black to-transparent w-full">
                        <h1 className="font-bold mb-2 sm:text-6xl text-4xl max-w-[800px]" style={{ lineHeight: '1.3' }}>
                            Explore the best Movies & TV shows
                        </h1>
                        <div className="text-2xl font-semibold mb-4"> Watch your favorite TV shows and movies</div>
                        <div className="flex items-center space-x-4 mb-4">
                            <span className="bg-yellow-500 text-black px-2 py-1 rounded">
                                16+
                            </span>
                            <span>🇺🇸 English</span>
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700">
                            <Play className="mr-2 h-4 w-4" /> Explore now
                        </Button>
                    </div>
                </div>
    </>
  )
}
