import useSpotify from "../hooks/useSpotify";
import { useEffect, useState } from 'react';
import { currentViewType } from '../atoms/viewAtom';
import { playlistState} from '../atoms/playlistsAtom';
import {useRecoilState} from 'recoil';

function AlbumsViewer() {
    const [albums, setAlbums] = useState([]);
    const [viewType, setViewType ] = useRecoilState(currentViewType);

    const [playlist, setPlaylist ] = useRecoilState(playlistState);

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
    
    const handleViewAlbum = (id) => {
        // setSelectedPlaylistId(id);
        spotifyApi.getAlbum(id)
            .then((data) => {
                console.log("got album:")
                console.log(data)
                setPlaylist(data.body)
            })
        setViewType('playlist');
    }

    return (
        <div className="text-white flex flex-wrap items-start overflow-auto p-2 justify-items-center">
        {albums?.map(album => {
            return (
                <div onClick={() => handleViewAlbum(album.album.id)} key={album.album.id} className=" hover:bg-gray-400 rounded-md m-5 p-4 bg-gray-600 w-[200px] min-h-[250px] max-h-[300px]">
                    <img className="w-50 h-40" src={album.album.images[0].url} alt="" />
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
