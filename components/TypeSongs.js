import React, { useEffect } from 'react'
import useSpotify from '../hooks/useSpotify'
import { currentTrackState, isPlayingState } from '../atoms/SongAtom'
import { useRecoilState } from 'recoil'
import millisToMinutesAndSeconds from '../lib/time'
import { useSession , signIn } from "next-auth/react"
import spotifyApi from '../lib/spotify'

const TypeSongs = ({order,track}) => {
    const spotifyAPI = useSpotify()
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState)
    const [currentTrack, setCurrentTrack] = useRecoilState(currentTrackState)
    const {data:session} = useSession()

    useEffect(()=>{
        if(session){
            if(session.error === "RefreshAccessTokenError"){
                signIn()
            }
            spotifyApi.setAccessToken(session?.user?.accessToken)
        }

    },[session])

    const playSong = () =>{
        setCurrentTrack(track?.track?.id)
        setIsPlaying(true)
        spotifyAPI.play({
            uris: [track?.track?.uri],  
        })
    }
    return (
        <div className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer '
            onClick={playSong}>
            <div className="flex items-center space-x-4">
                <p> {order+1} </p>
                <img className="h-10 w-10" src={track?.track?.album?.images[0]?.url}/>
                <div>
                    <p className='w-36 lg:w-64 truncate text-white'>{track?.track?.name}</p>
                    <p className='truncate w-64'>{track?.track?.artists[0]?.name}</p>
                </div>
            </div>
            <div className='flex items-center justify-between ml-auto md:ml-0'>
                <p className='hidden md:inline-flex'>{track?.track?.album?.name}</p>
                <p>{millisToMinutesAndSeconds(track?.track?.duration_ms)}</p>
            </div>
        </div>
    )
}

export default TypeSongs