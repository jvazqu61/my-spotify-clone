import {LibraryIcon} from '@heroicons/react/outline';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { playlistIdState,playlistState } from '../../atoms/listsAtom';
import useSpotify from '../../hooks/useSpotify';
import { currentViewType } from '../../atoms/viewAtom';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId ] = useRecoilState(playlistIdState);
    const currentPlaylist = useRecoilValue(playlistState)
    const [viewType, setViewType ] = useRecoilState(currentViewType)

    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then( (data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi])

    const handleViewUserLibrary = () =>{
        spotifyApi.getMyTopArtists()
            .then((data) => {
                setViewType('library');
            })
    }
    
    return (
        <div className="hidden md:inline-flex lg:max-w-[17rem] sm:max-w-[13rem] text-gray-400 p-5 text-s lg:text-m border-r border-[#3c3d3d] overflow-y-scroll h-screen scrollbar-hide transition-all mt-3">
            <div className="space-y-4 w-[10rem]">
           
                <button onClick={handleViewUserLibrary} className={` ${viewType === 'library' ? "bg-gray-600 rounded-md w-[10rem] pl-3 text-white":""} flex items-center space-x-2 hover:text-white`}>
                    <LibraryIcon  className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                
                <br />

              
                {/* <button className=' flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button> */}
                <hr className="border-t-[0.1] border-[#3c3d3d]" />

                {/* Render playlist */}
                {playlists?.map(playlist => {
                    return <p key={playlist.id} onClick={() => {
                        setSelectedPlaylistId(playlist.id);
                        setViewType('playlist');
                        
                        
                    }
                    } className={`${(currentPlaylist?.name === playlist.name && viewType !='library') ? "bg-gray-600 rounded-md w-[10rem] pl-3 text-white":""} cursor-pointer hover:text-white`}>{playlist.name}</p>
                })}
               
            </div>
        </div>
    )
}

export default Sidebar
