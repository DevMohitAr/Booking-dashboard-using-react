import React from "react";
import useLogin from "../../hooks/auth/useLogin";


export default function Login() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { mutate, isLoading } = useLogin();
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if ((!email, !password)) return null;
    mutate(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      }
    );
  };
  return (
    <div className="flex h-screen justify-center items-center bg-slate-200">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 space-y-2 outline-2  outline-offset-4 outline-slate-700 shadow-md border-2 border-slate-800 px-12 py-20 max-w-2xl w-[50%] outline-double"
      >
        <div>
          <label className="block mb-2 " htmlFor="">
            Email
          </label>
          <input
            className="bg-slate-100 p-2 w-full"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-2" htmlFor="pass">
            Password
          </label>
          <input
            type="password"
            name="pass"
            id="pass"
            className="bg-slate-100 p-2 w-full mb-5"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className={`${
            isLoading ? "bg-slate-200 text-slate-800" : "bg-slate-700"
          } p-2 text-slate-100 capitalize`}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
