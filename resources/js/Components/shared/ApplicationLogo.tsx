import { SVGAttributes } from 'react';

export default function ApplicationLogo({className=''}) {
    return (
        <img src="/images/Logo.png" alt="" className={'m-auto lg:size-1/3 xl:size-1/3 md:size-1/5 sm:size-1/4 size-1/3 ' + className} />
    );
}
