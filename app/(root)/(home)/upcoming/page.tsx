import CallList from '@/components/callList'
import React from 'react'

const Upcoming = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        A venir
      </h1>
      <CallList type="upcoming" />
    </section>
  )
}

export default Upcoming