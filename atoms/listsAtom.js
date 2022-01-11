import { atom } from 'recoil';

export const playlistState = atom({
    key: 'playlistState',
    default: null,
});

export const playlistIdState = atom({
    key: 'playlistIdState',
    default: ""

});

export const playlistShuffleState = atom({
    key: 'playlistShuffleState',
    default: false,
})