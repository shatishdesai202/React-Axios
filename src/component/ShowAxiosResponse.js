import React from 'react'

const ShowAxiosResponse = ({ axiosResponse: { status, data, headers, config } }) => {

    return (
        <>
            <div>
                <div className='ml-3'>Status</div>
                <div fallback="Loading..." className='ml-5 text-warning'>{status ? JSON.stringify(status) : '---'}</div>
            </div>
            <div>
                <div className='ml-3'>Header</div>
                <div className='ml-5'><pre className='text-warning'>{headers ? JSON.stringify(headers, null, 2) : '---'}</pre></div>
            </div>
            <div>
                <div className='ml-3'>Config</div>
                <div className='ml-5'><pre className='text-warning'>{config ? JSON.stringify(config, null, 2) : '---'}</pre></div>

            </div>
            <div>
                <div className='ml-3'>Data</div>
                <div className='ml-5'><pre className='text-warning'>{data ? JSON.stringify(data, null, 2) : '---'}</pre></div>
            </div>


        </>)
}

export default ShowAxiosResponse