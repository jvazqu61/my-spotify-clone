
import { useEffect, useState } from 'react';
import { playlistIdState, playlistState } from '../../atoms/playlistsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs";
import UserBanner from "./UserBanner";
import {currentViewType} from '../../atoms/viewAtom';



function CenterPlaylist({color}) {

    // const { data: session } = useSession();
    const spotifyApi = useSpotify();
    
    // const selectedPlaylistId= useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);
    const viewType = useRecoilValue(currentViewType)
    const selectedPlaylistId= useRecoilValue(playlistIdState);

    // useEffect(() => {
    //     console.log("innnn")
    //     if (selectedPlaylistId){
    //        spotifyApi
    //         .getPlaylist(selectedPlaylistId)
    //         .then((data) => {
    //             console.log("setting playlist")
    //             setPlaylist(data.body);
    //         }).catch((e) => {console.log("Error: something went wrong", e)}); 
    //     }
    //     return () => setPlaylist('');
    // }, [spotifyApi, selectedPlaylistId])

    // console.log("aall: ", selectedPlaylistId)

    console.log(playlist)
    return (
        <>
        <UserBanner />
           
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white paddin-8  w-full `}>
                
                
                <div className="flex items-center">
                    <img className="w-60 h-65 shadow-2xl ml-5 pb-10" src={playlist?.images?.[0]?.url} alt="" />
                    
                    
                    <div className="col-span-1 ml-5">
                        <p className="text-sm">{viewType.toLocaleUpperCase()}</p>
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
