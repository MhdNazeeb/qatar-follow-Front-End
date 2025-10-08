import Image from 'next/image'
import React from 'react'
import InputField from './InputField'
import { Input } from '@/common/types/types'
import { fields } from '@/common/types/strings'
import { Button } from '@/components/ui/button'

function page() {
    return (
        <div className='h-screen w-screen p-10'>
            <div className='flex flex-col gap-2 mb-10'>
                <div>
                    <h1>User Profile</h1>
                </div>
                <div>
                    <h6 className='font-extralight text-gray-700 text-sm'>Manage your Profile information and settings</h6>
                </div>
            </div>
            <div className=' flex flex-col gap-5 p-10  jsutify-center items-center'>
                <div className="w-20 h-20 rounded-full bg-white p-4 shadow flex items-center justify-center">
                    {/* <Image  src={}/> */}
                    {/* Content here */}
                </div>
                <div>
                    <h1 className='text-center'>name here</h1>
                    <h6 className='text-center font-extralight text-gray-700 text-sm'>admin</h6>
                </div>

            </div>
            <div>
                <h1>Points</h1>
            </div>
            <div className='mt-3 bg-gray-200 p-4'>
                <div className='flex flex-col gap-3 '>
                    <h6 className='text-sm'>Total Points</h6>
                    <h1 className='font-bold'>1,250</h1>

                </div>
            </div>
            <div className='mt-2'>
                <h1>Profile Details</h1>
            </div>
            <div className='mt-6'>
                {fields.map((val: Input, index: number) => (
                    <InputField key={index} />
                ))}
            </div>
            <div className='flex flex-row justify-end'>
    
                 <Button size={'lg'} variant={'outline'} className='bg-blue-400'  >
                    edit
                 </Button>   
            </div>

        </div>
    )
}

export default page