'use client'

import {  DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'

const MeetingSetup = ({ setIsSetupComplet }: { setIsSetupComplet : (value: boolean) => void }) => {
    const [isMicCamToggledOn, setIsMicCamToggledOn] = useState(false)
    const call = useCall()

    if(!call) throw new Error("L'utilisation appel doit etre utilisé dans le flux composant")

    useEffect(() => {
        if(isMicCamToggledOn) {
            call?.camera.disable()
            call?.microphone.disable()
        } else {
            call?.camera.enable()
            call?.microphone.enable()
        }

    }, [isMicCamToggledOn, call])


  return (
    <div className='flex h-screen flex-col w-full items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>Paramétre</h1>
        <VideoPreview /> 
        <div className='flex h-16 items-center justify-center gap-3'>
          <label className='flex justify-center gap-2 items-center font-medium'>
          <input 
            type="checkbox"
            checked={isMicCamToggledOn}
            onChange={(e) => setIsMicCamToggledOn(e.target.checked)}
          />
          Rejoindre le micro et le caméra eteint
            </label>  
            <DeviceSettings />
        </div>
        <Button
        className="rounded-md bg-green-500 px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplet(true);
        }}
      >
        Join meeting
      </Button>
    </div>
  )
}

export default MeetingSetup