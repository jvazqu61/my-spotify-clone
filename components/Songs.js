import { useRecoilValue } from "recoil";
import { playlistState } from '../atoms/playlistsAtom';
import Song from "./song";



function Songs() {
    const playlist = useRecoilValue(playlistState);

    

    return (
        <div className="flex flex-col px-2 space-y-1 ">
            {/* <div className="text-white w-5">#</div>
            <div className="text-white">TITLE</div>
            <div className="text-white">ALBUM</div>
            <div className="text-white">TIME</div> */}
            {playlist?.tracks.items.map((t, i) => {
            return (<Song key={t.track.id} track={t} songNum={i+1}/>)
                
            })}

        </div>  
    )
}

export default Songs
