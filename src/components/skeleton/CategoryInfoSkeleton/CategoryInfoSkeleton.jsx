import React from "react";

const CategoryInfoSkeleton = () => {
  return (
    <>
      <div className="bg-slate-400 animate-pulse rounded-full w-[8rem] h-[8rem]"></div>
      <div className="bg-slate-400 animate-pulse rounded-xl w-[8rem] h-[1.5rem]"></div>
    </>
  );
};

export default CategoryInfoSkeleton;
