"use client";

import { sideBarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Image from "next/image";

const SideBar = () => {
  const pathname = usePathname();
  return (
    <section
      className="flex justify-between sticky left-0 top-0 w-fit flex-col bg-dark-1 p-6 pt-28 text-white
    max-sm:hidden lg:w-[264px]"
    >
      <div className="flex flex-1 flex-col gap-6 flex-">
        {sideBarLinks.map((link) => {
          const isActive = pathname === link.route;

          return (
            <Link
              href={link.route}
              key={link.label}
              className={cn(
                "flex gap-4 items-center p-4 rounded-lg justify-start",
                {
                  "bg-blue-1": isActive,
                }
              )}
            >
              <Image
                src={link.imgUrl}
                alt={link.label}
                width={27}
                height={27}
              />
              <p className="text-lg font-semibold max-lg:hidden">
                {link.label}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SideBar;
