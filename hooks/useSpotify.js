
import { signIn, useSession} from 'next-auth/react';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import spotifyApi from '../lib/spoitfy';


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

    return spotifyApi;
    
}

export default useSpotify
