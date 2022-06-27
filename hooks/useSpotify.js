import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import spotifyApi from "../lib/spotify";
import SpotifyWebApi from 'spotify-web-api-node'

const useSpotify = () => {
    const { data: session } = useSession();
        
    useEffect(() => {
            if (session) {
            // If refresh access token attempt fails, direct user to login...
                if (session.error === "RefreshAccessTokenError") {
                    signIn();
                }
        
            spotifyApi.setAccessToken(session.user.accessToken);
            }
        }, [session]);
    
        return spotifyApi;
    }
    

export default useSpotify