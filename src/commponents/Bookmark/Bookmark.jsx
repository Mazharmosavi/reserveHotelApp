import React from 'react'
import { Outlet } from 'react-router-dom'
import { useBookmark } from '../Context/BookmarkProvider'
import Map from '../Map'
function Bookmark(){
    const {bookmarks}=useBookmark();
    return(
        <div className='appLayout'>
            <div className='sidebar'>
                {<Outlet/>}
            </div>
            <Map bookmarkLocation={bookmarks} />
        </div>
    )
 }export default Bookmark;