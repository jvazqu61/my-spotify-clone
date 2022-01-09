import { useRecoilState } from 'recoil';
import useSpotify from '../hooks/useSpotify';
import {timeConverter} from '../lib/timeConverter';
import {currentTrackIdState, isSongPlayingState} from '../atoms/songAtom';


function Song({trackUri, trackId, songNum, image, artist, trackName, albumName, duration}) {
    const spotifyApi = useSpotify();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);

    const playSong = () =>{
        setCurrentTrackId(trackId);
        setIsSongPlaying(true);
        spotifyApi.play({
            uris:[trackUri]
        })
    }

    
    
    return (
        <div 
            className="grid grid-cols-2 text-gray-400 py-4 px-5 hover:bg-gray-600  rounded-lg cursor-pointer"
            onClick={playSong}
        >
            <div className="flex items-center space-x-4">
                <p className=" w-5">{songNum}</p>
                
                <img className="w-10 h-10" src={image} alt="" />
                <div className="">
                    <p className="text-white w-36 lg:w-64 truncate">{trackName} </p>  
                    <p className="w-40">{artist} </p>  
                </div>
                
            </div>
            <div className=" flex items-center justify-between ml-auto md:ml-0">
                <p className="w-40 hidden md:inline ">{albumName}</p>
                <p className="">{timeConverter(duration)}</p>
            </div>
        </div>
    )
}

export default Song;
