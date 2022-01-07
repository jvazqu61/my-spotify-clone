import { atom } from 'recoil';

export const currentTrackIdState = atom({
    key:'currentTrackIdState',
    default:null,
})

export const isSongPlayingState = atom({
    key:'isSongPlayingState',
    default:false,
})