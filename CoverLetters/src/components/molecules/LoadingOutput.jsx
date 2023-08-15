import React, { Suspense } from 'react'
import { InputTextArea } from '../atoms/FormFields'
import { useLetterContext } from '../../context/LetterContext'
import Skeleton from '../atoms/Skeleton'

function LoadingOutput() {
    return (
        <>
            <div type='text' name={'letter-out'} className='p-5 space-y-5 overflow-y-hidden rounded w-full shadow-dark h-[95dvh] bg-white'>
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
                <Skeleton />
            </div>
        </>
    )
}

export default LoadingOutput
