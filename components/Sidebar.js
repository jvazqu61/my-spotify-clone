import {HomeIcon,SearchIcon, LibraryIcon, PlusCircleIcon, HeartIcon, RssIcon} from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { playlistIdState } from '../atoms/playlistsAtom';
import useSpotify from '../hooks/useSpotify';

function Sidebar() {
    const spotifyApi = useSpotify();
    const { data: session, status} = useSession();
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId ] = useRecoilState(playlistIdState);

    useEffect(() => {
        if (spotifyApi.getAccessToken()){
            spotifyApi.getUserPlaylists().then( (data) => {
                setPlaylists(data.body.items);
            })
        }
    }, [session, spotifyApi])

    console.log( playlists)
    return (
        <div className="text-gray-500 p-5 text-xs border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide">
            <div className="space-y-4">
            <button onClick={() => signOut()} className='flex items-center space-x-2  hover:text-white'>
                    <p>Logout</p>
                </button>
                <button className='flex items-center space-x-2  hover:text-white'>
                    <HomeIcon className="h-5 w-5" />
                    <p>Home</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <SearchIcon className="h-5 w-5" />
                    <p>Search</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <LibraryIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                
                <br />

                <button className='flex items-center space-x-2  hover:text-white'>
                    <PlusCircleIcon className="h-5 w-5" />
                    <p>Create Playlist</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <HeartIcon className="h-5 w-5" />
                    <p>Your Episodes</p>
                </button>
                <button className='flex items-center space-x-2 hover:text-white'>
                    <RssIcon className="h-5 w-5" />
                    <p>Your Library</p>
                </button>
                <hr className="border-t-[0.1] border-gray-900" />

                {/* Render playlist */}
                {playlists?.map(playlist => {
                    return <p key={playlist.id} onClick={() => {
                        setSelectedPlaylistId(playlist.id);
                    }
                    } className="cursor-pointer hover:text-white">{playlist.name}</p>
                })}
                {/* <p className="cursor-pointer hover:text-white">Playlist name ..</p>
                <p className="cursor-pointer hover:text-white">Playlist name ..</p>
                <p className="cursor-pointer hover:text-white">Playlist name ..</p>
                <p className="cursor-pointer hover:text-white">Playlist name ..</p>
                <p className="cursor-pointer hover:text-white">Playlist name ..</p>
                <p className="cursor-pointer hover:text-white">Playlist name ..</p> */}
            </div>
        </div>
    )
}

export default Sidebar
