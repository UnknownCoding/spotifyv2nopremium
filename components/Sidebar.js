import React, { useEffect, useState } from 'react'
import { HomeIcon,SearchIcon,LibraryIcon,PlusCircleIcon, HeartIcon, RssIcon ,LogoutIcon } from '@heroicons/react/outline'
import {signOut} from 'next-auth/react'
import { useSession } from "next-auth/react"
import { Router } from 'next/router'
import useSpotify from '../hooks/useSpotify'
import { useRecoilState } from 'recoil'
import { playListAtom, playListIdState } from '../atoms/playlistAtoms'



const Sidebar = () => {

const {data:session} = useSession()
const spotifyAPI = useSpotify()
const [playlist,setPlaylist] = useState([])
const [playListId,setPlaylistId] = useRecoilState(playListIdState)
const [playListData,setPlaylistData] = useRecoilState(playListAtom)

console.log(session)

useEffect(()=>{
    if (spotifyAPI.getAccessToken()){
        spotifyAPI.getUserPlaylists()?.then((data)=>{
            setPlaylist(data?.body?.items);
        })
    }
    console.log(playlist)
},[session,spotifyAPI])


return (
    <div className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll h-screen scrollbar-hide sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex'>
        <div className='space-y-4'>

            <button className='SidebarButton'>
                <HomeIcon className='h-5 w-5'/>
                <p>Home</p>
            </button>
            <button className='SidebarButton'>
                <SearchIcon className='h-5 w-5'/>
                <p>Search</p>
            </button>
            <button className='SidebarButton'>
                <LibraryIcon className='h-5 w-5'/>
                <p>Your Library</p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>
            
            <button className='SidebarButton'>
                <PlusCircleIcon className='h-5 w-5'/>
                <p>Create Playlist</p>
            </button>
            <button className='SidebarButton'>
                <HeartIcon className='h-5 w-5'/>
                <p>Liked Songs</p>
            </button>
            <button className='SidebarButton'>
                <RssIcon className='h-5 w-5'/>
                <p>Your episodes </p>
            </button>
            <hr className='border-t-[0.1px] border-gray-900'/>

            {/* Playlist from api ! */}
            {playlist?.map((playlists)=>(
                <p className='cursor-pointer hover:text-white' key={playlists?.id} onClick={()=>{setPlaylistId(playlists.id)}}>
                    {playlists?.name}
                </p>
            ))}

        </div>
    </div>
    )
}

export default Sidebar