import { set } from "date-fns";
import React from "react";
import { useSearchParams } from "react-router-dom";

export default function Pagination({ totalItems }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  let itemsSize = 5;
  const noOfPages = Math.ceil(totalItems / itemsSize);

  const handlePrev = () => {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    searchParams.set("page", prev);
    setSearchParams(searchParams);
  };
  const handleNext = () => {
    const next = currentPage === noOfPages ? currentPage : currentPage + 1;
    searchParams.set("page", next);
    const x = searchParams.get("status")
    if(x!=="all"){
      searchParams.set("status","all")
    }
    setSearchParams(searchParams);
  };
if (noOfPages<=1) return null;
  return (
    <>
      <div className="flex justify-between px-10 items-center">
        <h2>
          <span>{itemsSize * (currentPage - 1) + 1}</span> of{" "}
          <span>
            {currentPage !== noOfPages
              ? itemsSize + itemsSize * (currentPage - 1) + 1
              : totalItems}
          </span>{" "}
          results
        </h2>
        <div className="flex gap-4">
          <button
            className={`px-5 py-3 ${
              currentPage === 1 ? "bg-slate-200 text-slate-50" : "bg-slate-800 text-slate-100"
            }`}
            disabled={currentPage === 1}
            onClick={handlePrev}
          >
            Prev
          </button>
          <button
            className={`py-3 px-5 ${
              currentPage === noOfPages ? "bg-slate-200 text-slate-50" : "bg-slate-800 text-slate-100"
            }`}
            disabled={currentPage === noOfPages}
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}
