"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import HomeCard from "./homeCard";
import MeetingModal from "./meetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from './ui/input';

const MeetingTypeList = () => {
  const router = useRouter();
  const user = useUser();
  const client = useStreamVideoClient();
  const [meetingState, setMeetingState] = useState<
    "isSchudleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const { toast } = useToast();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast({
          title: "Veullez selectionner le jour et la date",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      if (!call) throw new Error("Impossible de creer un rappel");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant reunion";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      setCallDetails(call);

      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({
        title: "Reunion creer",
      });
    } catch (error) {
      console.log("Erreur");
      toast({
        title: "Impossible de creer un reunion",
      });
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;


  //---------------------------------------JSX------------------------------------------------------//

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add.svg"
        title="Nouvelle Réunion"
        description="Démarrer une nouvelle réunion"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-1"
      />
      <HomeCard
        img="/icons/plan.svg"
        title="Planifier une réunion"
        description="Planifiez votre réunion"
        handleClick={() => setMeetingState("isSchudleMeeting")}
        className="bg-blue-1"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="Voir l'enregistrement"
        description="Vérifiez votre enregistrement"
        handleClick={() => router.push('/recordings')}
        className="bg-purple-1"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Rejoindre une réunion"
        description="Via un lien d'invitation"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-1"
      />
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isSchudleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Créer une reunion"
          handleClick={createMeeting}
        >
          <div className="flex gap-2.5 flex-col">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Ajouter une description
            </label>
            <Textarea
              className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
              onChange={(e) => {
                setValues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <label className="text-base text-normal leading-[22px] text-sky-2">
              Selectionné la date 
            </label>
            <ReactDatePicker
              selected={values.dateTime}
              onChange={(date) => setValues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm, aa"
              className="w-full focus:outline-none bg-dark-1 rounded"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isSchudleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Reunion crée"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast({ title: "Lien copié" });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Lien reunion copié"
        />
      )}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Tapé votre lien ici"
        className="text-center"
        buttonText="Rejoindre la reunion"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="Meeting link"
          onChange={(e) => setValues({ ...values, link: e.target.value })}
          className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </MeetingModal>
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Démarrer une réunion instantanée"
        className="text-center"
        buttonText="Commencer la réunion"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
