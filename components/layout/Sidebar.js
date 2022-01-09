import {HomeIcon,SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../../atoms/playlistsAtom';
import useSpotify from '../../hooks/useSpotify';
import { currentViewType } from '../../atoms/viewAtom';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId ] = useRecoilState(playlistIdState);
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
                console.log(data);
                setViewType('library');
            })
    }

    console.log( playlists)
    return (
        <div className="hidden md:inline-flex lg:max-w-[15rem] sm:max-w-[12rem] text-gray-400 p-5 text-s lg:text-m border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide transition-all">
            <div className="space-y-4">
            <button onClick={() => signOut()} className='flex items-center space-x-2  hover:text-white'>
                    <p>Logout</p>
                </button>
                {/* <button className='flex items-center space-x-2  hover:text-white'>
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button> */}
                <button onClick={handleViewUserLibrary} className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon  className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                
                <br />

                {/* <button className='flex items-center space-x-2  hover:text-white'>
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button> */}
                
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className="h-5 w-5" />
                    <p>Liked Songs</p>
                </button>
                <hr className="border-t-[0.1] border-gray-900" />

                {/* Render playlist */}
                {playlists?.map(playlist => {
                    return <p key={playlist.id} onClick={() => {
                        setViewType('playlist');
                        setSelectedPlaylistId(playlist.id);
                    }
                    } className="cursor-pointer hover:text-white">{playlist.name}</p>
                })}
               
            </div>
        </div>
    )
}

export default Sidebar