import { SVGAttributes } from 'react';

export default function ApplicationLogo({ className = '' }) {
    return (
        // <img src="/images/Logo.png" alt="" className={'m-auto lg:size-1/3 xl:size-1/3 md:size-1/5 sm:size-1/4 size-1/3 ' + className} />
        <div className='text-center w-max mx-auto justify-center'>
            <h2 className='font-serif xl:text-3xl md:text-3xl text-2xl font-bold'>COOL POINT</h2>
            <h5 className='md:text-base text-sm font-light'>PRIVATE RESORT</h5>
        </div>
    );
}
