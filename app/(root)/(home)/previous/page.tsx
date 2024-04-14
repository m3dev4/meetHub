import CallList from '@/components/callList'
import React from 'react'

const Previous = () => {
  return (
    <section className='flex size-full flex-col gap-10 text-white'>
      <h1 className='text-3xl font-bold'>
        précédent
      </h1>
      <CallList type={'ended'} />
    </section>
  )
}

export default Previous