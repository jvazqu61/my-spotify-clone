import { useSession } from "next-auth/react";


function UserBanner() {
    const { data: session } = useSession();
    
    return (
        <header className="absolute top-5 right-8 max-w-50 min-w-22">
                <div className="flex items-center text-white bg-[#191919] space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-2 pr-2  w-10 md:w-44">
                   
                    {session?.user?.image ?<img 
                        className="rounded-full w-10 h-10"
                        src={session?.user?.image}
                        alt="" />: <svg  xmlns="http://www.w3.org/2000/svg" className="h-5 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg> }
                   
                    <h2 className="hidden md:inline " >{session?.user.name}</h2>
                    
                </div>
            </header>
    )
}

export default UserBanner
