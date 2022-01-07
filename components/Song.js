import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import {timeConverter} from '../lib/timeConverter';
import {currentTrackId, isSongPlaying} from '../atoms/songAtom';

function Song({track, songNum}) {
    const spotifyApi = useSpotify();
    const [currentTrackIds, setCurrentTrackId] = useRecoilState(currentTrackId);
    const [isSongPlayings, setIsSongPlaying] = useRecoilState(isSongPlaying);

    const playSong = () =>{
        setCurrentTrackId(track.track.id);
        setIsSongPlaying(true);
        spotifyApi.play({
            uris:[track.track.uri]
        })
    }

    
    return (
        <div 
            className="grid grid-cols-2 text-gray-400 py-4 px-5 hover:bg-gray-400 rounded-lg cursor-pointer"
            onClick={playSong}
        >
            <div className="flex items-center space-x-4">
                <p className=" w-5">{songNum}</p>
                
                <img className="w-10 h-10" src={track.track.album.images[0].url} alt="" />
                <div className="">
                    <p className="text-white w-36 lg:w-64 truncate">{track.track.name} </p>  
                    <p className="w-40">{track.track.artists[0].name} </p>  
                </div>
                
            </div>
            <div className=" flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline ">{track.track.album.name}</p>
                <p className="">{timeConverter(track.track.duration_ms)}</p>
            </div>
        </div>
    )
}

export default Song;
