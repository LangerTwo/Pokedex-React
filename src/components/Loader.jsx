import React from 'react'
import { tailspin } from 'ldrs'

const Loader = () => {
  tailspin.register()

  return (
   <div className='container-loader'>
     <l-tailspin
      size="100"
      stroke="5"
      speed="0.9" 
      color="#14B2D2" 
    ></l-tailspin>
   </div>
  )
}

export default Loader




// Default values shown

