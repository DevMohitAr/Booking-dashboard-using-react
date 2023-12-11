import React from 'react'
import { useForm } from 'react-hook-form'
import useUpdateUser from '../hooks/auth/useUpdateUser'

export default function UpdatePassForm() {
   const {
    register,
    handleSubmit,
    formState:{errors,isDirty,isValid},
    getValues,
    reset
}= useForm()
const { updateUser,isUpdating } = useUpdateUser();
   const onSubmit =({password})=>{
  updateUser({password},{onSettled:()=>reset()})
   }
  return (
    <form className="max-w-lg m-auto mt-6 border-2 border-cyan-800 p-4 grid gap-3 rounded-lg" onSubmit={handleSubmit(onSubmit)}>
      <Divider>
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          name="password"
          id="password"
          register={register("password", {
            required: {
              value: true,
              message: "password is required",
            },
            minLength: {
              value: 8,
              message: "password needs minimum of 8 characters",
            },
          })}
        />
        <p className="text-red-500">{errors.password?.message}</p>
      </Divider>
      <Divider>
        <Label htmlFor="passRepeat">Repeat Password</Label>
        <Input
          type="password"
          name="passRepeat"
          id="passRepeat"
          register={register("passRepeat", {
            required: {
              value: true,
              message: "password is required",
            },
            minLength: {
              value: 8,
              message: "password needs minimum of 8 characters",
            },
            validate: (value) => {
              return (
                value === getValues().password || "password needs to match"
              );
            },
          })}
        />
        <p className="text-red-500">{errors.passRepeat?.message}</p>
      </Divider>
      <button
        disabled={!isValid || !isDirty}
        type="submit"
        className="bg-cyan-800 text-cyan-100 p-3"
      >
        Submit
      </button>
    </form>
  );
}
export const Divider = ({ children }) => {
  return (
    <div className="grid grid-cols-[1fr] gap-2 items-center">{children}</div>
  );
};

export const Input = ({ type, register, ...props }) => {
  return (
    <input className="bg-gray-100 p-1 " type={type} {...props} {...register} />
  );
};

export const Label = ({ children }) => {
  return <label className="text-cyan-700 font-semibold">{children}</label>;
};