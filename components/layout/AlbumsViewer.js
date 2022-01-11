import useSpotify from "../../hooks/useSpotify";
import { useEffect, useState } from 'react';
import { currentViewType } from '../../atoms/viewAtom';
import { playlistState,playlistIdState} from '../../atoms/listsAtom';
import {useRecoilState, useRecoilValue} from 'recoil';
import {currentTrackIdState} from '../../atoms/songAtom';

function AlbumsViewer() {
    const [albums, setAlbums] = useState([]);
    const [viewType, setViewType ] = useRecoilState(currentViewType);

    const [playlist, setPlaylist ] = useRecoilState(playlistState);
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [selectedPlaylistId, setSelectedPlaylistId ] = useRecoilState(playlistIdState);

    const spotifyApi = useSpotify();
    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getMySavedAlbums().then( (data) => {
                console.log("setting album")
                console.log(data.body.items)
                setAlbums(data.body.items);
            })
        }
    }, [spotifyApi])
    
    const handleViewAlbum = (id,uri) => {
        // setSelectedPlaylistId(id);;
        spotifyApi.getAlbum(id)
            .then((data) => {
                console.log("got album:")
                console.log(data)
                setCurrentTrackId(uri)
                setPlaylist(data.body)
                setSelectedPlaylistId("");
                setViewType('album');
            })
        
        // setViewType('album');
    }

    return (
        <div className="text-white/80 flex flex-wrap items-start overflow-auto p-2 justify-items-center">
        {albums?.map(album => {
            return (
                <div 
                    onClick={() => handleViewAlbum(album.album.id, album.album.uri)} 
                    key={album.album.id} 
                    className=" card">
                    <img className="card-image" src={album.album.images[0].url} alt="" />
                    <div className="p-2">
                        <p className="text-lg font-bold truncate">{album.album.name}</p>
                        <p className="text-sm" truncate>{"By " + album.album.artists?.[0].name}</p>
                    </div>
                </div>
            )
        })}

    </div>
    )
}

export default AlbumsViewer
