import React from 'react'

type Props = {
    image:string
}
const GalleryImage = ({image}:Props) => {
  return (
    <div className='bg-gray-700 relative after:z-50 after:size-8 after:content-normal after:absolute after:bottom-0 after:border after:right-0 before:z-50 before:size-8 before:content-normal before:absolute before:top-0 before:border before:start-0'>
        {/* frame */}
        <div className="absolute w-[93%] h-[90%] border top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]"></div>
        <img src={image} className='object-cover' alt="" />
    </div>
  )
}

export default GalleryImage
