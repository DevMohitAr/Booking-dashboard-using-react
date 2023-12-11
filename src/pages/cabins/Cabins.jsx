import React from "react";
import { getCabins } from "../../services/apiCabins";
import { useQuery } from "@tanstack/react-query";
import Form from "../../ui/Form";
import Cabin from "./Cabin";
import { useCabins } from "../../hooks/cabins/useCabin";
import sortBy from "sort-by";
import CompFilter from "../../components/CompoundFilter";
import CabinAdd from "./CabinAdd";
import { useSearchParams } from "react-router-dom";
import SortBy from "../../components/SortBy";
export default function Cabins() {
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";
  let sortedValue = searchParams.get("sortBy") || "name-asc";
  const cabins = useCabins();

  if (cabins.isLoading) {
    return <p>loading...</p>;
  }
  if (cabins.isError) {
    return <p>error...</p>;
  }
  let filterCabins;
  if (filterValue === "all") {
    filterCabins = [...cabins.data];
  }
  if (filterValue === "no-discount") {
    filterCabins = cabins.data.filter((item) => {
      return item.discount === 0;
    });
  }
  if (filterValue === "with-discount") {
    filterCabins = cabins.data.filter((item) => {
      return item.discount > 0;
    });
  }
  const [field, direction] = sortedValue.split("-");
  let sortedCabins;
  const modifier = direction === "asc" ? 1 : -1;
  sortedCabins = filterCabins.sort((a, b) => a[field] - b[field] * modifier);

  return (
    <>
      <div className=" h-full w-full relative">
        <div className="flex justify-between px-5 text-lg py-4 items-center gap-4">
          <h1>All Cabins</h1>
          <div>
            <CompFilter
              filterField="discount"
              options={[
                { label: "all", value: "all" },
                { label: "with discount", value: "with-discount" },
                { label: "no discount", value: "no-discount" },
              ]}
              filterValue={filterValue}
            />
          </div>
          <div>
            <SortBy
              options={[
                { value: "name-asc", label: "sortBy-Name(A-Z)" },
                { value: "name-desc", label: "sortBy-Name(Z-A)" },
                {
                  value: "regularPrice-asc",
                  label: "sortBy-regularPrice(low-high)",
                },
                {
                  value: "regularPrice-desc",
                  label: "sortBy-regularPrice(high-low)",
                },
                {
                  value: "maxCapacity-asc",
                  label: "sortBy-Capacity(low-high)",
                },
                {
                  value: "maxCapacity-desc",
                  label: "sortBy-Capacity(high-low)",
                },
              ]}
            />
          </div>
        </div>
        <div className="grid relative grid-cols-[.6fr_1.8fr_2.2fr_1fr_1fr_1fr_1fr] items-center shadow-md gap-5 mb-4 bg-slate-600 p-3 text-slate-50 capitalize text-lg">
          <div></div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div>Description</div>
          <div>Image</div>
        </div>
        <div>
          {sortedCabins.map((cabin) => {
            return <Cabin key={cabin.id} cabin={cabin} />;
          })}
        </div>
        <CabinAdd />
      </div>
    </>
  );
}
