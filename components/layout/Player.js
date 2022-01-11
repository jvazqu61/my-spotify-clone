import { useSession } from "next-auth/react";
import useSpotify from "../../hooks/useSpotify"
import { currentTrackIdState, isSongPlayingState } from '../../atoms/songAtom';
import { playlistShuffleState } from '../../atoms/listsAtom';
import { useRecoilState } from 'recoil';
import { useState, useEffect, useCallback } from 'react';
import useSongInfo from "../../hooks/useSongInfo";
import { debounce } from "lodash";
import SpotifyWebPlayer from 'react-spotify-web-playback';

    function Player() {
        const spotifyApi = useSpotify();
        const { data: session, status } = useSession();
        const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
        const [isSongPlaying, setIsSongPlaying] = useRecoilState(isSongPlayingState);
        const [isShuffle, setShuffle] = useRecoilState(playlistShuffleState);
        const [volume, setVolume] = useState(50);
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
        
        )
    }

export default Player
