import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { playlistIdState, playlistState } from '../atoms/playlistsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";



function CenterPlaylist({color}) {

    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    
    // const selectedPlaylistId= useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    console.log("aall")
    console.log(playlist)
    return (
        <>
            <header className="absolute top-5 right-8 max-w-50 min-w-22">
                <div className="flex items-center text-white bg-[#191919] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 pr-2  w-10 md:w-44">
                   
                    {session?.user?.image ?<img 
                        className="rounded-full w-10 h-10"
                        src={session?.user?.image}
                        alt="" />: <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg> }
                   
                    <h2 className="hidden md:inline " >{session?.user.name}</h2>
                    
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white paddin-8  w-full `}>
                
                
                <div className="flex items-center">
                    <img className="w-60 h-65 shadow-2xl ml-5 pb-10" src={playlist?.images?.[0]?.url} alt="" />
                    
                    
                    <div className="col-span-1 ml-5">
                        <p className="text-sm">PLAYLIST</p>
                        <h1 className="xl:text-8xl md:text-6xl text-4xl font-bold">{playlist?.name}</h1>
                        <p className="text-gray-500 mt-5">
                        {playlist?.tracks?.total + " songs"  }
                    </p>
                    </div>
                    
                   
                    

                </div>
                
                

            </section>

            <div className="flex items-end ml-10 w-[1000px]">
                <Songs />
              
            </div>
        </>
    )
}

export default CenterPlaylist
