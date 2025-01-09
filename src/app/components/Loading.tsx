import { Loader2Icon } from 'lucide-react'
import React from 'react'

function Loading() {
  return (
    <div className='flex justify-center items-center'><Loader2Icon className='w-6 h-6 animate-spin' /></div>
  )
}

export default Loading