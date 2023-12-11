import React from "react";

import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
export default function SalesChart({ bookings, numDays }) {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end:new Date()
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <>
      <div className=" mt-10 max-w-5xl m-auto grid grid-cols-[1.25fr_4fr] gap-8 bg-slate-800 shadow-md p-3 rounded-2xl ">
        <div className="self-center">
          <h2 className="text-2xl text-cyan-500  font-thin text-center mb-2">Sales</h2>
          <p className="px-2">
       {format(allDates.at(0), "MMM dd yyyy")} &mdash;{" "}
            {format(allDates.at(-1), "MMM dd yyyy")}{" "}
          </p>
        </div>
        <div>
          <ResponsiveContainer height={300} width="100%">
            <AreaChart data={data}>
              <XAxis
                dataKey="label"
                tick={{ fill: "#e5e5e5" }}
                tickLine={{ stroke: "#e5e7eb" }}
              />
              <YAxis
                unit="Rs"
                tick={{ fill: "#fefefe" }}
                tickLine={{ stroke: "#e5e5e5" }}
              />
              <CartesianGrid strokeDasharray="4" />
              <Tooltip contentStyle={{ backgroundColor: "#334155" }} />
              <Area
                type="monotone"
                dataKey="totalSales"
                stroke="#8884d8"
                fill="#fefefe"
                strokeWidth={2}
                name="Total sales"
                unit="Rs"
              />
              <Area
                type="monotone"
                dataKey="extrasSales"
                stroke="#fefefe"
                fill="#e5e5e5"
                strokeWidth={2}
                name="Extra sales"
                unit="Rs"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </>
  );
}
