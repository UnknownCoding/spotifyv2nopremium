import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { playListIdState } from '../atoms/playlistAtoms'
import { playListAtom } from '../atoms/playlistAtoms'
import { isPlayingState } from '../atoms/SongAtom'
import TypeSongs from './TypeSongs'


const Song = () => {
    const playListId = useRecoilValue(playListIdState)
    const [playListData,setPlaylistData] = useRecoilState(playListAtom)
    return (
        <div className='text-white flex flex-col space-y-1 pb-28'>
            {playListData?.tracks?.items?.map((tracks, i)=>(
                <TypeSongs key={tracks?.track?.id} track={tracks} order={i}/>
            ))}
        </div>
    )
}

export default Song