import { useSession } from "next-auth/react";
import { playlistIdState, playlistState } from '../../atoms/playlistsAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import useSpotify from "../../hooks/useSpotify";
import Songs from "../Songs";
import { useState } from 'react';
import PlaylistViewer from './PlaylistViewer';
import AlbumsViewer from './AlbumsViewer';
import UserBanner from "./UserBanner";


function CenterLibrary() {
    const [tabSelected, setTabSelected] = useState('Playlists');

    

    const spotifyApi = useSpotify();
    return (
        <div className="overflow-scroll">
            <UserBanner />
            <div className="text-gray-50 flex items-center space-x-10 p-3 pl-20">
                <button onClick={() => setTabSelected('Playlists')} className={`${tabSelected === 'Playlists'?"bg-gray-500":"bg-black"} p-2 rounded-md`}>Playlists</button> 
                <button onClick={() => setTabSelected('Albums')} className={`${tabSelected === 'Albums'?"bg-gray-500":"bg-black"} p-2 rounded-md`}>Albums</button> 
            </div>
            <div>
                <h1 className="text-white p-5 text-2xl font-bold">{tabSelected}</h1>
                {tabSelected === 'Playlists'?<PlaylistViewer />:<AlbumsViewer />}
                
            </div>
            
        </div>
    )
}

export default CenterLibrary
