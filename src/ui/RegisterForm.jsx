import React from "react";
import { useFieldArray, useForm } from "react-hook-form";
import useSignUp from "../hooks/auth/useSignUp";
import { supabase } from "../services/supabase";
export default function RegisterForm() {
  const { mutate, isLoading } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isValid, isDirty },
    control,
    reset,
    getValues,
  } = useForm(
    {mode: "onBlur",
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "phNumbers",
  });

  const onSubmit = ({ email, password,name,twitter,phoneNumber }) => {
    mutate({ email, password,name,twitter,phoneNumber }, { onSettled: () => reset() });
  
  };
  return (
    <>
      <form
        className="max-w-lg m-auto mt-6 border-2 border-cyan-800 p-4 grid gap-3 rounded-lg"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Divider>
          <Label htmlFor="name">Name</Label>
          <Input
            type="text"
            name="name"
            id="name"
            register={register("name", {
              required: {
                value: true,
                message: "Name is required",
              },
            })}
          />
          <p className="text-red-500">{errors.name?.message}</p>
        </Divider>

        <Divider>
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            register={register("email", {
              pattern: {
                value:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "Invalid email format",
              },
            })}
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </Divider>
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
        <Divider>
          <Label htmlFor="twitter">Twitter</Label>
          <Input
            type="text"
            name="twitter"
            id="twitter"
            register={register("twitter")}
          />
        </Divider>

        <Divider>
          <Label htmlFor="linkedin">PhoneNumber</Label>
          <Input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            register={register("phoneNumber", {
              required: "phone number is required",
              pattern: {
                value: /^[7-9]\d{9}$/,
                message: "Please enter a valid phone number",
              },
            })}
          />
          <p className="text-red-500">{errors?.phoneNumber?.message}</p>
        </Divider>
        <div>
          {fields.map((field, index) => {
            if (index > 1) {
              return (
                <>
                  <div className="text-slate-400  capitalize mb-4 font-semibold">
                    <p>can't add more than 2 phone numbers</p>
                  </div>
                </>
              );
            } else {
              return (
                <React.Fragment key={field.id}>
                  <div className="flex justify-between p-2">
                    <label htmlFor="" className="text-cyan-700 font-semibold">
                      PhoneNumber
                    </label>

                    <button
                      onClick={() => remove(index)}
                      className="text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    className="w-full bg-gray-100 p-1 mb-2"
                    {...register(`phNumbers.${index}.number`, {
                      pattern: {
                        value: /^[7-9]\d{9}$/,
                        message: "Please enter a valid phone number",
                      },
                    })}
                  />
                  <p className="text-red-500">
                    {errors?.phNumbers?.[index]?.number?.message}
                  </p>
                </React.Fragment>
              );
            }
          })}
        </div>
        <div className="text-center -mt-4">
          {fields.length < 1 && (
            <button onClick={() => append()} className="text-cyan-600 ">
              Add an Alternate Number
            </button>
          )}
        </div>

        <button
          disabled={!isValid || !isDirty}
          type="submit"
          className="bg-cyan-800 text-cyan-100 p-3"
        >
          Submit
        </button>
      </form>
    </>
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

// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// ,resolver:zodResolver(schema)
// const schema = z.object({
//   name: z.string().trim().toLowerCase(),
//   email: z.string().email("please provide valid format"),
//   twitter:z.string().toLowerCase()
// });

const myGame = async () => {
  console.log("jio");
  let { data, error } = await supabase.auth.signUp({
    email: "someone@email.com",
    password: "sQzciGVTiQDteepwVAMI",
  
  });
  if (error) {
    throw new Error("vjhfjfkjf");
  }
  return data;
};
