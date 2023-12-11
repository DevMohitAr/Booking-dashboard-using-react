import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import { createEditCabin } from "../services/apiCabins";
import { useCreateCabin } from "../hooks/cabins/useCreateCabin";
import { useUpdateCabin } from "../hooks/cabins/useUpdateCabin";

export default function Form({ cabin = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabin;
  const isEditSession = Boolean(editId);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: isEditSession ? editValues : {} });
  const { mutate: createCabin, isLoading: isCreating } = useCreateCabin();
  const { mutate: editCabin, isLoading: isEditing } = useUpdateCabin();

  const isWorking = isCreating || isEditing;
  const onSubmit = (data) => {
    const image = typeof data.image === "string" ? data.image : data.image[0];
    if (isEditSession)
      editCabin(
        { newCabinData: { ...data, image }, id: editId },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal();
          },
        }
      );
    else
      createCabin(
        { ...data, image: image },
        {
          onSuccess: (data) => {
            reset();
            onCloseModal();
          },
        }
      );
  };
  return (
    <form
      action=""
      className=" grid max-w-2xl grid-cols-2 m-auto border-2 p-3 mt-5 gap-4 bg-white"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div>
        <label htmlFor="name" id="name" className="block">
          Name
        </label>

        <input
          type="text"
          name="name"
          className="p-2 bg-slate-300 w-full"
          disabled={isWorking}
          {...register("name", {
            minLength: 1,
            maxLength: 15,
            required: true,
          })}
        />
      </div>
      <div>
        <label className="block w-full" htmlFor="maxCapacity" id="maxCapacity">
          MaxCapacity
        </label>
        <input
          type="number"
          name="maxCapacity"
          className="p-2 bg-slate-300 w-full"
          disabled={isWorking}
          {...register("maxCapacity", { min: 1, max: 5, required: true })}
        />
      </div>
      <div>
        <label htmlFor="regularPrice" id="regularPrice" className="block">
          RegularPrice
        </label>
        <input
          type="number"
          name="regularPrice"
          className="p-2   bg-slate-300 w-full"
          disabled={isWorking}
          {...register("regularPrice", {
            min: 2500,
            max: 8000,
            required: true,
          })}
        />
      </div>
      <div>
        <label className="block" htmlFor="discount" id="discount">
          Discount{" "}
        </label>{" "}
        <input
          type="number"
          name="discount"
          className="p-2   bg-slate-300 w-full"
          disabled={isWorking}
          {...register("discount", { min: 0, max: 500 })}
        />
      </div>
      <div>
        <label className="block" htmlFor="description" id="description">
          Description
        </label>
        <input
          type="text"
          name="description"
          className="p-2 border-1 border-zinc-500 bg-slate-300 w-full  "
          disabled={isWorking}
          {...register("description", { maxLength: 50 })}
        />
      </div>
      <div>
        <label className="block " htmlFor="image" id="image">
          Cabin Photo
        </label>
        <input
          accept="image/*"
          type="file"
          name="image"
          className="p-2 border-1 border-zinc-500 bg-slate-300 w-full "
          disabled={isWorking}
          {...register("image", {
            required: isEditSession ? false : "this field is required",
          })}
        />
      </div>
      <div className="row-start-6 col-start-1 col-end-3">
        {" "}
        <button
          className="col-start-1 bg-slate-600 text-slate-100 mt-5 w-full p-3"
          type="submit"
        >
          {isEditSession ? "edit a cabin" : "create a cabin"}
        </button>
      </div>
    </form>
  );
}
