import React from "react";
import { useUpdateSetting } from "../hooks/settings/useUpdateSetting";

export const SettingForm = ({ setting }) => {
  const {
    minimumBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice,
  } = setting;
  console.log(
    minimumBookingLength,
    maxBookingLength,
    maxGuestPerBooking,
    breakfastPrice
  );
  const { mutate: updateSetting, isLoading } = useUpdateSetting();
  const handleUpdate = (e, field) => {
    const updatedValue = e.target.value;
    updateSetting({ [field]: updatedValue });
  };
  return (
    <form className="border-2 border-slate-700 max-w-lg m-auto mt-10 p-4 flex flex-col gap-4">
      <div className="flex gap-8 items-center">
        <label htmlFor="minbooking" className="flex-1">
          MinbookingLength
        </label>
        <input
          type="number"
          name="minimumBookingLength"
          id="minimumBookingLength"
          defaultValue={minimumBookingLength}
          className="p-3 bg-slate-200 flex-1"
          onChange={(e) => handleUpdate(e, "minimumBookingLength")}
        />
      </div>
      <div className="flex gap-8 items-center">
        <label htmlFor="maxbooking" className="flex-1">
          MaxbookingLength
        </label>
        <input
          type="number"
          name="maxBookingLength"
          id="maxBookingLength"
          defaultValue={maxBookingLength}
          className="p-3 bg-slate-200 flex-1"
          onChange={(e) => handleUpdate(e, "maxBookingLength")}
        />
      </div>
      <div className="flex gap-8 items-center">
        <label htmlFor="maxGuestPerBooking" className="flex-1">
          Maxguestperbooking
        </label>
        <input
          type="number"
          id="maxGuestPerBooking"
          defaultValue={maxGuestPerBooking}
          className="p-3 bg-slate-200 flex-1"
          onChange={(e) => handleUpdate(e, "maxGuestPerBooking")}
        />
      </div>
      <div className="flex gap-8 items-center">
        <label htmlFor="breakfastPrice" className="flex-1">
          BreakfastPrice
        </label>
        <input
          type="number"
          id="breakfastPrice"
          defaultValue={breakfastPrice}
          className="p-3 bg-slate-200 flex-1"
          onChange={(e) => handleUpdate(e, "breakfastPrice")}
        />
      </div>
    </form>
  );
};
