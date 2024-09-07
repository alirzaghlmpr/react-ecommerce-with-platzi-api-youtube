import React from "react";

const CategoriesChipsSkeleton = () => {
  return Array.from("123456").map((i) => (
    <div key={i} className="mx-4 flex flex-wrap gap-4">
      <div className="flex items-center gap-2 p-2 bg-slate-100 rounded-md">
        <div className="w-[3rem] h-[3rem] bg-slate-400 animate-pulse rounded-full"></div>
        <div className="w-[4rem] h-[1rem] bg-slate-400 animate-pulse rounded-lg"></div>
      </div>
    </div>
  ));
};

export default CategoriesChipsSkeleton;
