'use client'
import MeetingRoom from "@/components/meetingRoom";
import MeetingSetup from "@/components/meetingSetup";
import { useGetCallById } from "@/hooks/useGetCallById";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { useState } from "react";

const Meeting = ({ params: { id } }: { params: { id: string } }) => {
  const { user, isLoaded } = useUser();
  const [isSetupComplet, setIsSetupComplet] = useState(false);
  const { call, isCallLoading } = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />;
    return (
      <main className="h-screen w-full">
        <StreamCall call={call}>
          <StreamTheme>
          {!isSetupComplet ? (
            <MeetingSetup setIsSetupComplet={setIsSetupComplet}  />
          ) : (
            <MeetingRoom />
          )}
          </StreamTheme>
        </StreamCall>
      </main>
    );
  };
  
export default Meeting;
