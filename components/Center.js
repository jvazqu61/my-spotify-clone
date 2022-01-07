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

    function msToTime (ms){
        const min = Math.floor(ms/60000);
        const sec = ((ms%60000)/1000).toFixed(0);
        return (min+":"+sec);
    }
    
    useEffect(() => {
        spotifyApi.getPlaylist(selectedPlaylistId).then((data) => {
            setPlaylist(data.body);
        }).catch((e) => {console.log("Error: something went wrong", e)});
    }, [spotifyApi, selectedPlaylistId])

    console.log(playlist)
    return (
        <div className="flex-grow w-10 overflow-y-scroll h-screen scrollbar-hide ">
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
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white paddin-8  w-full `}>
                
                
                <div className="flex items-center">
                    <img className="w-55 h-60 ml-5 pb-10" src={playlist?.images[1].url} alt="" />
                    
                    
                    <div className="col-span-1 ml-5">
                        <h1 className="text-sm">PLAYLIST</h1>
                        <p className="text-6xl font-bold">{playlist?.name}</p>
                        <p className="text-gray-500 mt-5">
                        {playlist?.tracks.total + " songs"  }
                    </p>
                    </div>
                    
                   
                    

                </div>
                
                

            </section>
            <div className="flex items-start ml-10 ">
              <div className="grid grid-cols-4 md:grid-cols-6  ">
                    <div className="text-white w-5">#</div>
                    <div className="text-white">TITLE</div>
                    <div className="text-white">ALBUM</div>
                    <div className="text-white">TIME</div>
                    {playlist?.tracks.items.map((t, i) => {
                        return (
                            <>
                            <div className="text-white w-5">{i+1}</div>
                            <div className="flex items-start text-white ">
                                <img className="w-10" src={t.track.album.images[2].url} alt="" />
                                <div className="flex">
                                  <p>{t.track.name} </p>  
                                </div>
                                
                                
                            </div>
                            <div className="text-white w-15 h-10 overscroll-auto">{t.track.album.name}</div>
                            <div className="text-white">{msToTime(t.track.duration_ms)}</div>
                            </>
                        )
                    })}

                </div>  
            </div>
            
        </div>
    )
}

export default Center
