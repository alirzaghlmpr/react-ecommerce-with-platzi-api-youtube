import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import getCategoryByIdApi from "../../utils/apis/categories/getCategoryByIdApi";
import Header from "../../components/common/Header";
import CategoryInfoSkeleton from "../../components/skeleton/CategoryInfoSkeleton";
import ErrorOnFetchApi from "../../components/common/ErrorOnFetchApi";
import ProductsByCategoryGrid from "../../components/common/ProductsByCategoryGrid";

const Categories = () => {
  const { id } = useParams() || "";

  const { isPending, error, data } = useQuery({
    queryKey: ["categoriesById"],
    queryFn: () => getCategoryByIdApi(id),
  });

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center gap-4">
        {isPending && <CategoryInfoSkeleton />}
        {error && <ErrorOnFetchApi />}
        {data && (
          <>
            <img
              className="w-[8rem] h-[8rem] rounded-full"
              src={data?.data?.image}
              alt=""
            />
            <p className="font-bold">{data?.data?.name}</p>
          </>
        )}
      </div>
      {data && <ProductsByCategoryGrid id={id} />}
    </>
  );
};

export default Categories;
