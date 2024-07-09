import React from 'react'
import Sensei from './Sensei';

function Team() {
  return (
    <>
      <div className='bg-slate-500 grid grid-cols-4 gap-[2vw]'>
        <Sensei/>
      </div>
    </>
  )
}

export default Team