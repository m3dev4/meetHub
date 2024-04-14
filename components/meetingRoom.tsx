import { cn } from "@/lib/utils";
import {
  CallControls,
  CallParticipantsList,
  CallStatsButton,
  CallingState,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, Users } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./endCallButton";
import Loader from "./loader";

type callLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const searchParams = useSearchParams()
  const isPersonalRoom = !! searchParams.get('personal')
  const [layout, setLayout] = useState<callLayoutType>("speaker-left");
  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const { useCallCallingState } = useCallStateHooks()
  const callingState = useCallCallingState()

  if(callingState !== CallingState.JOINED) return <Loader />

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;
      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;
      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="flex size-full justify-center items-center relative">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] hidden ml-2", {
            "show-block": showParticipantsList,
          })}
        >
          <CallParticipantsList
            onClose={() => setShowParticipantsList(false)}
          />
        </div>
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
          <CallControls />
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232B] px-4 py-2 hover:bg-[#4c535b] ">
                <LayoutList size={20} className="text-white" />
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="border-dark-1 bg-dark-1 text-white">
              {["grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
                <div key={index}>
                  <DropdownMenuItem className="cursor-pointer" onClick={() => {
                    setLayout(item.toLowerCase() as callLayoutType)
                  }}>
                    {item}
                    </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          <CallStatsButton />
          <button onClick={() => setShowParticipantsList((prev) => !prev)}>
              <div className="rounded-2xl bg-[#19232B] px-4 py-2 hover:bg-[#4c535b] cursor-pointer">
                <Users size={20} className="text-white"/>
              </div>
          </button>
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  );
};

export default MeetingRoom;
