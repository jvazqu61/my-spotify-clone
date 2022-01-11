
import { useSession } from "next-auth/react";
import { useEffect, useState } from 'react';
import { shuffle } from 'lodash';
import { playlistIdState, playlistState } from '../../atoms/listsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs";
import CenterPlaylist from './CenterTracks';
import CenterLibrary from "./CenterLibrary";
import { currentViewType } from "../../atoms/viewAtom";

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
    const [viewType, setViewType ] = useRecoilState(currentViewType)

    useEffect(() => {
        setColor(shuffle(colors).pop());
    }, [selectedPlaylistId])

    
    
    useEffect(() => {
        console.log("innnn")
        if (selectedPlaylistId){
           spotifyApi
            .getPlaylist(selectedPlaylistId)
            .then((data) => {
                // console.log("setting playlist")
                setPlaylist(data.body);
            }).catch((e) => {console.log("Error: something went wrong", e)}); 
        }
        
        
    }, [spotifyApi, selectedPlaylistId, viewType])

    console.log("aall: ", selectedPlaylistId)
    
    console.log(playlist)

    
    return (
        <div className="flex-grow w-3 overflow-y-scroll h-screen scrollbar-hide ">
            {/* <CenterPlaylist color={color} /> */}
            {viewType === 'library' ? <CenterLibrary /> : 
                <CenterPlaylist color={color} />}
            
            
        </div>
    )
}

export default Center;


