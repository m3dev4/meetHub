import  StreamVideoProvider from "@/providers/streamClientProvider"
import { Metadata } from "next";
import { ReactNode } from "react"

export const metadata: Metadata = {
  title: "MeetHub",
  description:
    "MeetHub est une plateforme de vidéoconférence intuitive conçue pour réunir les gens du monde entier en ligne. Avec MeetHub, vous pouvez organiser des réunions professionnelles, des séminaires en ligne, des cours virtuels et des retrouvailles avec vos proches, le tout en quelques clics.",
    icons: {
      icon: '/icons/logo.svg'
    }
};

const rootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>
     {children}  
     </StreamVideoProvider>
    </main>
  )
}

export default rootLayout