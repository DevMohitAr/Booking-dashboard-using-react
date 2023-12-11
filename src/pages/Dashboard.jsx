import React from 'react'
import CompFilter from "./../components/CompoundFilter"
import DashBoardLayout from './DashBoardLayout';
import { useSearchParams } from 'react-router-dom';
import Dashfilter from '../components/DashFilter';

export default function Dashboard() {
  const [searchParams] = useSearchParams()
  const filterValue = searchParams.get("last") || 45;
  return (
    <div className="bg-slate-500 text-slate-100 h-full ">
      <div className="flex justify-center bg-slate-950 text-lg">
        {/* <CompFilter
          filterField={"last"}
          options={[
            { value: "7", label: "Last 30 days" },
            { value: "30", label: "Last 45 days" },
            { value: "90", label: "Last 90 days" },
          ]}
          filterValue={filterValue}
        /> */}
        <Dashfilter
          filterField="last"
          options={[
            { value: "30", label: "Last 30 days" },
            { value: "45", label: "Last 45 days" },
            { value: "90", label: "Last 90 days" },
          ]} 
          filterValue={filterValue}
        />
      </div>
      <div>
        <DashBoardLayout />
      </div>
    </div>
  );
}

