import { ChevronDownIcon } from "@heroicons/react/outline";
import { useSession, signOut } from "next-auth/react";
import { useState } from 'react';



function UserBanner() {
    const { data: session } = useSession();
    const [showSignoutOptions, setShowSignoutOptions] = useState('invisible');

    const handleShowSignOut = () => {

        showSignoutOptions === 'invisible' ?  setShowSignoutOptions('visible') : setShowSignoutOptions('invisible') 
    }

   
    return (
        <header className="absolute top-5 right-8 max-w-[400px] min-w-[60px]">
                <div className="sticky flex items-center text-white bg-[#191919] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 pr-2  w-10 md:w-44">
                   
                    {session?.user?.image ?<img 
                        className="rounded-full w-10 h-10"
                        src={session?.user?.image}
                        alt="" />: <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg> }
                   
                    <h2 className="hidden md:inline " >{session?.user.name}</h2>
                    <ChevronDownIcon onClick={handleShowSignOut} className="w-10"/>
                    
                </div>
                <div className={` ${showSignoutOptions} origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-[#b3afa6] ring-1 ring-gray-400 ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1 `}>
                    <div className="py-1" role="none">
                        <button onClick={() => signOut()} type="submit" className=" ml-[4rem] hover:text-white/100  rounded-md  hover:bg-gray-600 text-gray-700/80 block w-25 text-center px-4 py-2 text-sm hover:scale-105 transition duration-200 ease-out"  role="menuitem" tabindex="-1" id="menu-item-3">
                            Sign out
                        </button>

                    </div>
                </div>

            </header>
    )
}

export default UserBanner
