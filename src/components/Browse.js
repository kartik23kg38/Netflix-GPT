import React from 'react'
import Header from './Header'

const Browse = () => {
  return (
    <div>
      <Header />
      <div className='relative w-full h-screen flex items-center justify-center'>
        <h1 className='text-black text-opacity-70 font-bold text-4xl'>
          All the webseries, episodes, and shows...
        </h1>
      </div>
    </div>
  )
}

export default Browse