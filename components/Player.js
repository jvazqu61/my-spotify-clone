import { useSession } from "next-auth/react";
import useSpotify from "../hooks/useSpotify"
import {currentTrackIdState, isSongPlayingState} from '../atoms/songAtom';
import { useRecoilState } from 'recoil';
import {useState} from 'react';
import useSongInfo from "../hooks/useSongInfo";

function Player() {
    const spotifyApi = useSpotify();
    const {data:session , status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
        
    return (
        <div className="bg-[#191919] h-20 flex items-start text-white">
            {/* left side of player: album cover, song name, artist name */}
            <div className="flexç">
                <img className="w-[60px] h-[60px] justify-center " src={songInfo?.album.images?.[0].url}/>
                {console.log(songInfo)}
                <div className=" ">
                    <p>{songInfo.name}</p>
                    <p>{songInfo?.artists[0].name}</p>
                </div>
            </div>

            {/* middle  of player: controls, song time */}
            <div>

            </div>

            {/* right side of player: volume controls */}
            <div>

            </div>
        </div>
    )
}

export default Player
