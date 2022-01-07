
import { signIn, useSession} from 'next-auth/react';
import spotifyApi from "../lib/spoitfy";
import { useEffect } from 'react';

function useSpotify() {
    const {data: session, status} = useSession();

    useEffect(() => {
        if (session){
          if (session.error === 'RefreshTokenAccessError'){
            signIn();
        }
        spotifyApi.setAccessToken(session.user.accessToken);
  
        }

        // if refresh token access fails then redirect user to login 
        
    }, [session])

    return (
        spotifyApi
    );
}

export default useSpotify
