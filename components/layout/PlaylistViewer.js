import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from 'react';
import { currentViewType } from '../../atoms/viewAtom';
import { playlistIdState } from '../../atoms/playlistsAtom';
import {useRecoilState } from 'recoil';

function PlaylistViewer() {
    const [playlists, setPlaylists] = useState([]);
    const [viewType, setViewType ] = useRecoilState(currentViewType);
    const [selectedPlaylistId, setSelectedPlaylistId ] = useRecoilState(playlistIdState);

    const spotifyApi = useSpotify();
    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then( (data) => {
                console.log("setting")
                setPlaylists(data.body.items);
            })
        }
    }, [spotifyApi])

    const handleViewAlbum = (id) => {
        setSelectedPlaylistId(id);
        setViewType('playlist');
    }
    
    console.log(playlists)
    return (
        // <div>
            <div  className="text-white flex flex-wrap items-start overflow-auto p-2 justify-items-center">
                {playlists?.map(playlist => {
                    return (
                        <div onClick={() => handleViewAlbum(playlist.id)} key={playlist.id} className=" hover:bg-gray-400 rounded-md m-5 p-4 bg-gray-600 w-[200px] min-h-[250px] max-h-[300px]">
                            <div className="border-red-200 border-[3px] rounded-md"><img className="w-50 h-40" src={playlist?.images[0]?.url} alt="" /></div>
                            <div className="p-2">
                                <p className="text-lg font-bold truncate">{playlist.name}</p>
                                <p className="text-sm" truncate>{"By " + playlist.owner.display_name}</p>
                            </div>
                        </div>
                    )
                })}

            </div>
            
        // </div>
    )
}

export default PlaylistViewer;
