
import { playlistState } from '../../atoms/listsAtom';
import {  useRecoilValue } from 'recoil';
import Songs from "../Songs";
import UserBanner from "./UserBanner";
import {currentViewType} from '../../atoms/viewAtom';
import MyHead from './MyHead';



function CenterPlaylist({color}) {

    const list = useRecoilValue(playlistState);
    const viewType = useRecoilValue(currentViewType)
 

    return (
        <>
        <MyHead title={(viewType?.charAt(0).toUpperCase() + viewType.slice(1)) + " - " + list?.name} />
        <UserBanner />
           
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white paddin-8  w-full `}>
                
                
                <div className="flex items-center">
                    <img className="w-60 h-65 shadow-2xl ml-5 mb-7 rounded-md" src={list?.images?.[0]?.url} alt="" />
                    
                    
                    <div className="col-span-1 ml-5">
                        <p className="text-sm">{viewType.toLocaleUpperCase()}</p>
                        <h1 className="xl:text-6xl md:text-6xl text-4xl font-bold">{list?.name}</h1>
                        <p className="text-gray-500 mt-5">
                        {list?.tracks?.total + " songs"  }
                    </p>
                    </div>
                    
                    
                   
                    

                </div>
            </section>

            <div className="flex items-end ml-10 w-[95%]">
                
                <Songs />
              
            </div>
        </>
    )
}

export default CenterPlaylist
