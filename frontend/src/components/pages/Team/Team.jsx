import React from 'react'
import Sensei from './Sensei';


function Team() {
  const teamArr = [1,2,3,4,5,6,7,8,9,10];
  return (
    <>
      <div className=''>
      {
        teamArr.length < 1 ? <span> member is not availeble </span> :(
          <div className='flex justify-center p-5 '>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 ">
            {teamArr.map((item, index) => {
          return (
            <div key={index} className=' 
            '>
              <Sensei />
              </div>
              )
        })
      }
            </div>
          </div>
        )
      }
      </div>
    </>
  )
}

export default Team