import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';
import Image from "next/image";



function UserBanner() {
    const { data: session } = useSession();
    const [showSignoutOptions, setShowSignoutOptions] = useState('invisible');

    const handleShowSignOut = () => {

        showSignoutOptions === 'invisible' ?  setShowSignoutOptions('visible') : setShowSignoutOptions('invisible') 
    }

   
    return (
        <header className="absolute top-5 right-8 max-w-[400px] min-w-[60px]">
                <div className="sticky flex items-center text-white bg-[#191919] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 pr-2  w-10 md:w-44">
                   
                    {session?.user?.image ?<Image 
                        className="rounded-full w-10 h-10"
                        src={session?.user?.image}
                        alt="" />: <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg> }
                   
                    <h2 className="hidden md:inline " >{session?.user.name}</h2>
                    <ChevronDownIcon onClick={handleShowSignOut} className="w-10"/>
                    
                </div>
              
                   
                    <button onClick={() => signOut()}  className={` ${showSignoutOptions} p-1.5 origin-top-right absolute  right-0 mt-4 drop-shadow-lg bg-[antiquewhite]  focus:outline-none  hover:text-white/100  rounded-md font-bold hover:bg-[#252525] text-gray-700/80  w-56 text-center text-sm hover:scale-105 transition duration-200 ease-out block"   `}  >
                        Sign out
                    </button>

                   
                

            </header>
    )
}

export default UserBanner
