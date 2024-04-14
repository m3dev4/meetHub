import NavBar from "@/components/navBar"
import SideBar from "@/components/sideBar"
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
    <main className="relative">
        <NavBar />
       <div className="flex">
        <SideBar />
         <section className="flex min-h-screen flex-& flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px14">
            <div className="w-full">
            {children} 
            </div>
         </section>
       </div>
    </main>
  )
}

export default rootLayout