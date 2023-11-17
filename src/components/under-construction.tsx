import React from "react";
import { BsFillGearFill } from "react-icons/bs";

const UnderConstruction: React.FC = () => (
  <div className="mx-auto flex flex-col items-center justify-center justify-items-center rounded-[40px] bg-secondary shadow-lg p-10">
    <h1 className="mb-4 text-xl font-bold md:text-2xl">En construction</h1>
    <p className="mb-4 text-center text-xl">
      Nous travaillons actuellement sur ce site. Revenez bientôt pour découvrir nos nouveautés !
    </p>
    <BsFillGearFill className="w-36 h-36 m-10 text-alt animate-spin -rotate-90 transition-transform"/>
  </div>
);

export default UnderConstruction;
