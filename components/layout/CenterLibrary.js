import { useState } from 'react';
import PlaylistViewer from './PlaylistViewer';
import AlbumsViewer from './AlbumsViewer';
import UserBanner from "./UserBanner";
import MyHead from "./MyHead";


function CenterLibrary() {
    const [tabSelected, setTabSelected] = useState('Playlists');

    return (
        <>
        <MyHead title={"My Library - " + tabSelected }/>
        <UserBanner />
            <div className="overflow-y-scroll scrollbar-hide">
                <div className="text-gray-50 flex items-center space-x-10 p-3 pl-20">
                    <button onClick={() => setTabSelected('Playlists')} className={`${tabSelected === 'Playlists'?"bg-gray-500":"bg-black"} p-2 rounded-md`}>Playlists</button> 
                    <button onClick={() => setTabSelected('Albums')} className={`${tabSelected === 'Albums'?"bg-gray-500":"bg-black"} p-2 rounded-md`}>Albums</button> 
                </div>
                <div>
                    <h1 className="text-white p-5 text-2xl font-bold">{tabSelected}</h1>
                    {tabSelected === 'Playlists'?<PlaylistViewer />:<AlbumsViewer />}
                    
                </div>
                
            </div>
        </>
    )
}

export default CenterLibrary
