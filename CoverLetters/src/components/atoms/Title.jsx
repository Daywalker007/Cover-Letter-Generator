import React from 'react'

function Title({children}) {
    return (
        <div className='mb-5'>
            <h2 className='text-2xl text-white'>{children}</h2>
            <hr />
        </div>
    )
}

export default Title
