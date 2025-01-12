import React from 'react'

const ReservationStatusMessage = ({status,className=""}:{status:string,className?:string}) => {
    return (
        <div className={`bg-gray-200 px-4 py-3 rounded-lg ${className}`}>
            <p className="font-medium text-secondary flex items-center gap-2 md:text-base text-sm">
                <span className='m-icon'>info</span>
                <span>This reservation has status: <span className=' uppercase'>{status}</span></span>
            </p>
        </div>
    )
}

export default ReservationStatusMessage
