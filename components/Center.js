import React, { useEffect, useState } from 'react'
import { useSession , signOut } from "next-auth/react"
import { ChevronDownIcon } from '@heroicons/react/outline'
import {shuffle} from 'lodash'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playListIdState } from '../atoms/playlistAtoms'
import { playListAtom } from '../atoms/playlistAtoms'
import useSpotify from '../hooks/useSpotify'
import Song from './Song'

const Center = () => {
    const spotifyAPI = useSpotify()
    const {data:session} = useSession()
    const [color, setColor] = useState(null)
    const [head, setHead] = useState(null)
    const playListId = useRecoilValue(playListIdState)
    const [playListData,setPlaylistData] = useRecoilState(playListAtom)


    const colors = ['from-indigo-500','from-purple-500','from-yellow-500','from-orange-500','from-violet-500',]
    
    useEffect(()=>{
        setColor(shuffle(colors).pop())
        const head = color?.slice(5,11)
        const headv2 = parseInt(color?.slice(12,16))-300
        const headv3 = headv2.toString()
        const headv4 = `bg-${head}-${headv3}`
        setHead(headv4)
        console.log(headv4)
    },[playListId])

    useEffect(()=>{
        spotifyAPI?.getPlaylist(playListId).then((data) => {
            setPlaylistData(data.body);
        }).catch((err) => console.log("Something went wrong!", err));        
    },[playListId])
    
    console.log(playListData)

    return (
        <div className='flex-grow text-white relative h-screen overflow-y-scroll scrollbar-hide'>
            <header className='absolute top-5 right-8'>
                <div onClick={signOut} className={`flex items-center ${head} bg-black space-x-3 opacity-90 hover:opacity-80  rounded-full p-1 pr-2 cursor-pointer`}>
                    <img src={session?.user?.image} className="rounded-full w-10 h-10 "></img>
                    <h2>{session?.user?.name}</h2>
                    <ChevronDownIcon className='w-5 h-5 mt-1'/>
                </div>
            </header>
            <section className={`flex items-end space-x-7 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}>
                <img className='h-44 w-44 shadow-2xl' src={playListData?.images?.[0]?.url}/>
                <div>
                    <p>PLAYLIST</p>
                    <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>{playListData?.name}</h1>
                </div>
            </section>
            <div >
                <Song/>
            </div>
        </div>
    )
}

export default Center