import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from 'react';
import { currentViewType } from '../../atoms/viewAtom';
import { playlistIdState } from '../../atoms/listsAtom';
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
            <div  className=" text-white/80 flex flex-wrap items-start overflow-auto p-2 justify-items-center h-[75vh] scrollbar-hide">
                {playlists?.map(playlist => {
                    return (
                        <div onClick={() => handleViewAlbum(playlist.id)} key={playlist.id} className=" card">
                            <img className="card-image" src={playlist?.images[0]?.url} alt="" />
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
