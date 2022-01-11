import { useRecoilValue } from "recoil";
import { playlistState,playlistIdState } from '../atoms/playlistsAtom';
import Song from "./song";
import { currentViewType } from '../atoms/viewAtom';
import useSpotify from "../hooks/useSpotify";
import { useEffect } from 'react';



function Songs() {
    
    const playlist = useRecoilValue(playlistState);
    const viewType = useRecoilValue(currentViewType);
    const selectedPlaylistId= useRecoilValue(playlistIdState);
    const spotifyApi = useSpotify();

  
    

    return (
        <div className="flex flex-col px-2 space-y-1 ">
            {/* <div className="text-white w-5">#</div>
            <div className="text-white">TITLE</div>
            <div className="text-white">ALBUM</div>
            <div className="text-white">TIME</div> */}
            {console.log("ply: ", playlist)}
            {playlist?.tracks?.items.map((t, i) => {
                // spotifyApi.addToQueue(viewType === 'album' ? t?.uri : t?.track?.uri)
                    // .then((data) => console.log("got: "))
                console.log("track: ", t)
                
            return (<Song 
                key={viewType === 'album' ? t.id : t?.track?.id}  
                trackUri={viewType === 'album' ? t.uri : t?.track?.uri}
                trackId={viewType === 'album' ? t.id : t?.track?.id}
                image={ (viewType === 'album') ? (playlist.images?.[0].url ) : (t.track?.album?.images?.[0].url) }
                artist={(viewType === 'album') ? (t.artists?.[0].name ) : (t.track?.artists?.[0].name) }
                trackName={(viewType === 'album') ? (t.name ) : (t.track?.name)}
                albumName={(viewType === 'album') ? (playlist.name ) : (t.track?.album?.name)}
                duration={(viewType === 'album') ? (t.duration_ms ) : (t.track?.duration_ms)}
                songNum={i+1}
                />)
                
            })}

        </div>  
    )
}

export default Songs
