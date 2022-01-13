import Head from 'next/head'
import Sidebar from '../components/layout/Sidebar';
import Center from '../components/layout/Center';
import { getSession } from 'next-auth/react';
import Player from '../components/layout/Player';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Home(props) {
  const [showPlayer, setShowPlayer] = useState(false);
  const { data: session, status } = useSession();
  const {accessToken } = session;


  useEffect(() => {
    if (!session?.user.accessToken) return ;
    
    setShowPlayer(true)
    
      
  }, [accessToken])
  return (
    <div className="bg-black h-screen overflow-hidden">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex">
        {/* side-bar */}
        <Sidebar  />

        {/* main */}
        <Center />
       
      </main>
      {/* music player */}
      <div className="sticky bottom-0">
        {showPlayer && <Player />}
        
      </div>
      
    </div>
  )
}

export async function getServerSideProps(context){
  const session = await getSession(context);
  return {
    props: {
      session
    },
  }

}