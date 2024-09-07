import React from "react";
import Avatar from "@mui/material/Avatar";
import Chip from "@mui/material/Chip";
import { useQuery } from "@tanstack/react-query";
import getCategoriesApi from "../../../utils/apis/categories/getCategoriesApi";
import CategoriesChipsSkeleton from "../../skeleton/CategoriesChipsSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi";
import { Link } from "react-router-dom";

const CategoriesChips = () => {
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: () => getCategoriesApi(),
  });

  return (
    <div className="mx-4 flex flex-wrap gap-4">
      {isPending && <CategoriesChipsSkeleton />}
      {error && <ErrorOnFetchApi />}
      {data &&
        data?.data.map((category) => (
          <Link to={`/categories/${category?.id}`} key={category?.id}>
            <Chip
              sx={{ height: "5rem" }}
              avatar={
                <Avatar
                  sx={{ width: "4rem !important", height: "4rem !important" }}
                  alt={`${category?.name} image`}
                  src={category?.image}
                />
              }
              label={category?.name}
              variant="outlined"
            />
          </Link>
        ))}
    </div>
  );
};

export default CategoriesChips;
