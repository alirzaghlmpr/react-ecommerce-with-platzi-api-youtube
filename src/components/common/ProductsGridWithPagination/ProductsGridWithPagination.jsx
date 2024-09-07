import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import ProductGridSkeleton from "../../skeleton/ProductGridSkeleton";
import ErrorOnFetchApi from "../ErrorOnFetchApi";
import { Link } from "react-router-dom";
import getProductsApi from "../../../utils/apis/products/getProductsApi";
import Pagination from "@mui/material/Pagination";

const ProductsGridWithPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 6;
  const total = 200; //backend in reponse should provide total page , total items and ...
  const { isPending, error, data } = useQuery({
    queryKey: ["products", currentPage],
    queryFn: () => getProductsApi((currentPage - 1) * limit, limit),
  });

  return (
    <div className="flex flex-wrap gap-4 px-8 items-center justify-center my-8">
      {isPending &&
        Array.from("123456").map((i) => <ProductGridSkeleton key={i} />)}
      {error && <ErrorOnFetchApi />}
      {data &&
        data?.data?.map((product) => (
          <Link
            to={`/products/${product?.id}`}
            key={product?.id}
            className="rounded-xl flex flex-col shadow-lg gap-4 items-center justify-center pb-4 w-5/12 lg:w-3/12">
            <img
              src={product?.images[0].replace(/^["[]+|["\]]/g, "")}
              className="w-[100%] rounded-t-xl h-[15rem]"
            />
            <p>{product?.title}</p>
            <p>{product?.price}$</p>
          </Link>
        ))}
      {data && (
        <div className="my-8">
          <Pagination
            onChange={(event, value) => {
              setCurrentPage(value);
            }}
            size="large"
            count={Math.ceil(total / limit)}
            defaultPage={currentPage}
            boundaryCount={2}
          />
        </div>
      )}
    </div>
  );
};

export default ProductsGridWithPagination;
