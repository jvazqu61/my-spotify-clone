import { atom } from 'recoil';

export const currentViewType = atom({
    key:'currentViewType',
    default:'library',
})