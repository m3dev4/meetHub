import React from "react";
import Image from "next/image";
const Loader = () => {
  return (
    <div className="flex-center h-screen w-full">
      <Image
        src="/icons/spinner.svg"
        alt="loading icon"
        width={30}
        height={30}
      />
    </div>
  );
};

export default Loader;
