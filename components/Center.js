import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from '../atoms/playlistsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../hooks/useSpotify";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-red-500",
    "from-yellow-500",
    "from-pink-500",
    "from-purple-500",
]


function Center() {
    const { data: session } = useSession();
    const spotifyApi = useSpotify();
    const [color, setColor] = useState(null)
    const selectedPlaylistId= useRecoilValue(playlistIdState);
    const [playlist, setPlaylist] = useRecoilState(playlistState);

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [selectedPlaylistId])
    
    useEffect(() => {
        spotifyApi.getPlaylist(selectedPlaylistId).then((data) => {
            setPlaylist(data.body);
        }).catch((e) => {console.log("Error: something went wrong", e)});
    }, [spotifyApi, selectedPlaylistId])

    console.log(playlist)
    return (
        <div className="flex-grow  ">
            <header className="absolute top-5 right-8">
                <div className="flex items-center  bg-red-300 space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2">
                    <img 
                        className="rounded-full w-10 h-10"
                        src={session?.user.image}
                        alt="" />
                    <h2>{session?.user.name}</h2>
                    <ChevronDownIcon className="h-5 w-5"/>                
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white paddin-8  w-full`}>
                
                
                <div className="flex items-start">
                    <img className="h-45 w-40 ml-5 pb-10" src={playlist?.images[0].url} alt="" />
                    <p>PLAYLIST</p>
                    
                    <br/>
                    <h3>{playlist?.name}</h3>
                   
                    

                </div>

            </section>
            
        </div>
    )
}

export default Center
