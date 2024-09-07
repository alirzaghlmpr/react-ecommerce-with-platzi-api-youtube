import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";

const DashboardSkeleton = () => {
  return (
    <ListItem alignItems="flex-start">
      <div className="lg:w-[10rem] w-[5rem] me-6 rounded-full animate-pulse bg-slate-400 h-[5rem] lg:h-[10rem]"></div>
      <ListItemText
        primary={
          <div className="bg-slate-400 animate-pulse rounded-lg w-[15rem] h-[1.5rem]"></div>
        }
        secondary={
          <div className="flex flex-col gap-4 mt-4">
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse rounded-lg w-[5rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse rounded-lg w-[8rem] h-[1rem]"></div>
            </div>{" "}
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse rounded-lg w-[5rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse rounded-lg w-[8rem] h-[1rem]"></div>
            </div>{" "}
            <div className="flex gap-4">
              <div className="bg-slate-400 animate-pulse rounded-lg w-[5rem] h-[1rem]"></div>
              <div className="bg-slate-400 animate-pulse rounded-lg w-[8rem] h-[1rem]"></div>
            </div>{" "}
          </div>
        }
      />
    </ListItem>
  );
};

export default DashboardSkeleton;
