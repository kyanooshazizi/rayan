import React from 'react'
import Link from 'next/link'
const index = () => {
  return (
    <section className='col-span-5 mt-[70px] flex flex-col justify-center content-center flex-wrap'>
      <Link href="/map">map</Link>
        <div className='w-[40%] bg-white mt-4  rounded-md '>
            <span className='text-center mx-auto block text-xl font-bold'>مشخصات فرستنده</span>
            <form action="" className='mt-4'>
              <div className='mr-4'>
              <label htmlFor="Fullname">نام و نام خانوادگی</label>
                <input type="text" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              <div className='mr-4 mt-4'>
              <label htmlFor="Fullname">آدرس فرستنده</label>
                <input placeholder='' type="text" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              <div className='mr-4 my-4'>
              <label htmlFor="Fullname">شماره تلفن</label>
                <input type="number" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              
            </form>
        </div>
        <div className='w-[40%] bg-white rounded-md mt-4'>
            <span className='text-center mx-auto block text-xl font-bold'>مشخصات گیرنده</span>
            <form action="" className='mt-4'>
              <div className='mr-4'>
              <label htmlFor="Fullname">نام و نام خانوادگی</label>
                <input type="text" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              <div className='mr-4 mt-4'>
              <label htmlFor="Fullname">آدرس گیرنده</label>
                <input placeholder='' type="text" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              <div className='mr-4 my-4'>
              <label htmlFor="Fullname">شماره تلفن</label>
                <input type="number" name='Fullname' id="Fullname" className='bg-[#F4F3F3] block rounded  px-2 py-3 w-[90%] outline-utils-300 mt-1 border-1 border-solid border-gray-200'/>
              </div>
              
            </form>
        </div>
        <div className='w-[40%] bg-white rounded-md mt-4'>
          <textarea>
            
          </textarea>
        </div>
    </section>
  )
}

export default index
