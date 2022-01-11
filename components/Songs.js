import { useRecoilValue } from "recoil";
import { playlistState,playlistIdState } from '../atoms/listsAtom';
import Song from "./Song";
import { currentViewType } from '../atoms/viewAtom';
import { ClockIcon } from "@heroicons/react/outline";



function Songs() {
    
    const list = useRecoilValue(playlistState);
    const viewType = useRecoilValue(currentViewType);
 

  
    

    return (
        <div className="flex flex-col px-2 space-y-1 w-[100%]">
            <div 
                className="grid grid-cols-2 text-gray-400 py-2 px-5 cursor-pointer border-b-2 border-[#3c3d3d] "
   
            >
                <div className="flex items-center space-x-4 w-[200px]">
                    <p className=" w-5 font-bold">#</p>
                    
                    <p className="font-bold"> TITLE</p>  
                </div>
                <div className=" flex items-center justify-between ml-auto md:ml-0">
                    <p className="w-[12rem] hidden md:inline font-bold ml-[8rem">ALBUM</p>
                    <p className="font-bold"><ClockIcon className="w-7"/></p>
                    
                </div>
                <div>

                </div>
            
            </div>
            {console.log("ply: ", list)}
            {list?.tracks?.items.map((t, i) => {
                
                
            return (<Song 
                key={viewType === 'album' ? t.id : t?.track?.id}  
                trackUri={viewType === 'album' ? t.uri : t?.track?.uri}
                trackId={viewType === 'album' ? t.id : t?.track?.id}
                image={ (viewType === 'album') ? (list.images?.[0].url ) : (t.track?.album?.images?.[0].url) }
                artist={(viewType === 'album') ? (t.artists?.[0].name ) : (t.track?.artists?.[0].name) }
                trackName={(viewType === 'album') ? (t.name ) : (t.track?.name)}
                albumName={(viewType === 'album') ? (list.name ) : (t.track?.album?.name)}
                duration={(viewType === 'album') ? (t.duration_ms ) : (t.track?.duration_ms)}
                songNum={i+1}
                />)
                
            })}

        </div>  
    )
}

export default Songs
