import clsx from 'clsx'
import React from 'react'

const PageLoaderComponent = ({show=false}:{show?:boolean}) => {
  return (
    <div className={clsx("page-loader transition-all animate-out animate-in",
        {
            "hidden": !show,
            "flex": show
        }
    )}>
        <div className="relative">
            <div className=" animate-spin ease-out duration-1200 lg:size-40 size-32 border-4 border-gray-100 border-t-primary rounded-full">
            </div>
            <p className="text animate-pulse duration-1200 font-serif text-8xl text-primary absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]">C</p>
        </div>
    </div>
  )
}

export default PageLoaderComponent
