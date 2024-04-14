'use client'

import MeetingTypeList from "@/components/meetingTypeList";
import React, { useState, useEffect } from "react";

const Home = () => {
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString("sn-SN", {
        hour: "2-digit",
        minute: "2-digit",
      });
      const formattedDate = new Intl.DateTimeFormat("fr-FR", {
        dateStyle: "full",
      }).format(now);
      setTime(formattedTime);
      setDate(formattedDate);
    }, 1000); // Mettre à jour toutes les secondes

    return () => clearInterval(interval); // Nettoyage de l'intervalle lors du démontage du composant
  }, []); // Videz le tableau de dépendances pour n'exécuter cette logique qu'une seule fois

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <div className="h-[300px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11 ">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>
      <MeetingTypeList />
    </section>
  );
};

export default Home;


