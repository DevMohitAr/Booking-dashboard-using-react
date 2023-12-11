import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
export default function Filter({ filterField, options = [], filterValue }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const handleClick = (value) => {
    // Set the filter value
    searchParams.set(filterField, value);

    if (searchParams.get("page")) {
      searchParams.set("page", 1);
    }
    setSearchParams(searchParams);
  };
  return (
    <div className="flex  gap-3 rounded-lg  p-4 bg-slate-100">
      {options.map((item, i) => {
        return (
          <button
            className={`capitalize px-3 py-1 hover:text-blue-900 transition-all ${
              filterValue === item.value
                ? "bg-transparent text-blue-700 border-2 border-blue-900"
                : "text-blue-700"
            } `}
            key={i}
            onClick={() => handleClick(item.value)}
            disabled={filterValue === item.value}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
