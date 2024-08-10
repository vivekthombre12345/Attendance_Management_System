import React from 'react'



function StudentPanelIndex() {
  return (
    <>
     <div className=' bg-blue-600 text-white flex shadow-lg'>
      <span className='p-5 font-bold text-lg text-white text-[20px]'>Student Panel</span>
      <nav className='ml-auto list-none flex gap-5  cursor-pointer text-[20px] p-5 '>
        <li>Dashboard</li>
        <li>Attendance</li>
        <li>Report</li>


        

      </nav>
      </div>
     
    </>
  )
}
export default StudentPanelIndex;