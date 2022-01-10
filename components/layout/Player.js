import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify"
import { currentTrackIdState, isSongPlayingState } from '../../atoms/songAtom';
import { playlistShuffleState } from '../../atoms/playlistsAtom';
import { useRecoilState } from 'recoil';
import { useState, useEffect, useCallback } from 'react';
import useSongInfo from "../../hooks/useSongInfo";
// import { ReplyIcon, FastForwardIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon } from "@heroicons/react/outline";
import { ReplyIcon, FastForwardIcon, PauseIcon, PlayIcon, RewindIcon, SwitchHorizontalIcon } from "@heroicons/react/solid";
import { VolumeOffIcon, VolumeUpIcon } from "@heroicons/react/outline";
import { debounce } from "lodash";
import SpotifyWebPlayer from 'react-spotify-web-playback';

    function Player() {
        const spotifyApi = useSpotify();
        const { data: session, status } = useSession();
        const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
        const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);
        const [isShuffle, setShuffle] = useRecoilState(playlistShuffleState);
        const [volume, setVolume] = useState(50);
        // const [isShu]
        const {accessToken} = session.user;
        const songInfo = useSongInfo();

        const fetchCurrentSong = () => {
            if (!songInfo) {
                spotifyApi.getMyCurrentPlayingTrack().then((data) => {
                    console.log("curr: ", data)
                    // setCurrentTrackId(data.body?.item?.uri);
                    spotifyApi.getMyCurrentPlaybackState().then((data) => {
                        console.log("state: ", data)
                        setCurrentTrackId(data.body?.item?.uri);
                        setIsSongPlaying(data.body?.is_playing);
                    })
                })
            }
        }

        useEffect(() => {
            console.log("tokk: ", currentTrackId)
            if (spotifyApi.getAccessToken() && !currentTrackId) {
                console.log("fetching new: ");
                fetchCurrentSong();
                setVolume(50);
            }

        }, [currentTrackId, spotifyApi, session])

        useEffect(() => {
            if (volume >= 0 && volume < 100) {
                debounceAdjustVolume(volume);
            }
        }, [volume])

        const debounceAdjustVolume = useCallback(
            debounce((volume) => {

                spotifyApi.setVolume(volume).catch((e) => { });
            }, 500),
            []
        )

        const handlePlay = () => {

            spotifyApi.getMyCurrentPlaybackState().then((data) => {
                if (data?.body?.is_playing) {
                    spotifyApi.pause();
                    setIsSongPlaying(false);
                }
                else {
                    spotifyApi.play();
                    setIsSongPlaying(true);
                }
            })
        }

        // update the song state after skipping the song 
        const handleSkipSong = () => {
            spotifyApi.skipToNext()
                .then(async () => {
                    spotifyApi.getMyCurrentPlayingTrack()
                        .then((data) => {
                            console.log("in")
                            console.log(data)
                            setCurrentTrackId(data?.body?.item.id)
                            // setIsSongPlaying(true);
                        })

                })
        }

        const handlePreviousSong = () => {
            spotifyApi.skipToPrevious()
                .then(async () => {
                    spotifyApi.getMyCurrentPlayingTrack()
                        .then((data) => {
                            console.log("in2")
                            console.log(data)
                            setCurrentTrackId(data?.body?.item.id)
                            setIsSongPlaying(true);
                        }).catch((e) => console.log("Error getting current song "))

                }).catch((e) => { console.log("Error while trying to skip song") })
        }

        const handleShuffle = () => {

            spotifyApi.setShuffle(true)
                .then(async () => {
                    setShuffle(!isShuffle)

                }).catch((e) => { console.log("Error while trying to skip song") })
        }


        return (
            <SpotifyWebPlayer 
                token={accessToken} 
                uris={currentTrackId?[currentTrackId]:[]} 
                callback={ (state) => {setIsSongPlaying(state.is_playing)}}
                play={isSongPlaying}
                showSaveIcon={true}
                magnifySliderOnHover={true}
               
                    styles={{
                        activeColor: '#fff',
                        bgColor: '#191919',
                        color: '#939696',
                        loaderColor: '#fff',
                        sliderColor: '#1cb954',
                        trackArtistColor: '#ccc',
                        trackNameColor: '#fff',
                        height: '5rem',
                        sliderTrackColor:'#535454'
                      }}
                    syncExternalDevice={true}
                    persistDeviceSelection={true}
                    autoPlay={true}
                 />
            // <div className="grid grid-cols-3 bg-[#191919] h-24 flex items-center text-white text-xs md:text-base px-2 md:px-8 ">
            //     {/* left side of player: album cover, song name, artist name */}
            //     <div className="flex items-center space-x-4 ">
            //         {songInfo? <img className=" w-10 h-10 hidden sm:inline  " src={songInfo?.album.images?.[0].url}/>:
            //          <></>}
            //         {/* <img className=" w-10 h-10 hidden sm:inline  " src={songInfo?.album.images?.[0].url}/> */}
            //         {console.log(songInfo)}
            //         <div className="">
            //             <h3 className="text-md">{songInfo?.name}</h3>
            //             <p className="text-xs">{songInfo?.artists?.[0].name}</p>
            //         </div>
            //     </div>

            //     {/* middle  of player: controls, song time */}
            //     <div className="flex items-center justify-evenly">
            //         <SwitchHorizontalIcon onClick={handleShuffle} className={`button  ${isShuffle?'fill-[#18D860]':'fill-white'} `} />
            //         <RewindIcon onClick={handlePreviousSong} className="button" />
            //         {isSongPlaying? (
            //             <PauseIcon onClick={handlePlay} className="button h-10 w-10" />
            //         ):(
            //             <PlayIcon onClick={handlePlay} className="button h-10 w-10" />
            //         )}
            //         <FastForwardIcon onClick={handleSkipSong} className="button" />
            //         <ReplyIcon className="button" />

            //     </div>

            //     {/* right side of player: volume controls */}
            //     <div className="flex items-center space-x-3 md:space-x-4 justify-end" >
            //         <VolumeOffIcon onClick={() => setVolume(0)} className="button" />
            //         <input 
            //             className="w-14 md:w-28" 
            //             onChange={(e) => {setVolume(Number(e.target.value))}}
            //             type="range" value={volume}  
            //             min={0} 
            //             max={100} 
            //         />
            //         <VolumeUpIcon onClick={() => {volume<100 && setVolume(volume+10)}} className="button"/>
            //     </div>
            // </div>
        )
    }

export default Player
