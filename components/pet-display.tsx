import React from "react";
import Image from "next/image";

export default function PetDisplay() {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mb-6 border-4k">
      <div className="flex flex-col items-center">
        <div className="relative mb-4">
          <div className="absolute inset-0 rounded-full blur-2xl opacity-30 animate-pulse"></div>
          <Image
            src={"/pet-1.png"}
            alt="Your study companion"
            width={200}
            height={200}
            className="relative z-10 drop-shadow-2xl"
          />
        </div>
        <div className="bg-blue-500 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
          Status: Happy
        </div>
      </div>
    </div>
  );
}
