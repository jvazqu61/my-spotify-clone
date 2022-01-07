import { atom } from 'recoil';

export const currentTrackId = atom({
    key:'currentTrackId',
    default:null,
})

export const isSongPlaying = atom({
    key:'isSongPlaying',
    default:false,
})