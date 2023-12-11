import React from 'react'
import useUser from '../hooks/auth/useUser';
import useUpdateUser from '../hooks/auth/useUpdateUser';

export default function UpdateDataForm() {
     const [newname, setNewname] = React.useState("");
     const [image, setImage] = React.useState("");
    
  const { data } = useUser();
  const { email } = data;
  const { updateUser, isUpdating } = useUpdateUser();
       const handleSubmit = (e) => {
         e.preventDefault();
         if (!newname) return;
         updateUser(
           { name: newname, avatar: image },
           {
             onSuccess: () => {
               setImage(null);
               e.target.reset();
             },
           }
         );
       };
  return (
    <form
      className="max-w-lg m-auto mt-6 border-2 border-cyan-800 p-4 grid gap-3 rounded-lg"
      onSubmit={handleSubmit}
    >
      <div className="grid grid-cols-[1fr] gap-2 items-center">
        <label className="text-cyan-700 font-semibold" htmlFor="">
          Name
        </label>
        <input
          type="text"
          className="bg-gray-100 p-1 "
          value={newname}
          onChange={(e) => setNewname(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-[1fr] gap-2 items-center">
        <label className="text-cyan-700 font-semibold" htmlFor="">
          Email
        </label>
        <input
          type="email"
          className="bg-gray-100 text-gray-300 p-1 "
          value={email}
          disabled
        />
      </div>
      <div className="grid grid-cols-[1fr] gap-2 items-center">
        <label className="text-cyan-700 font-semibold" htmlFor="">
          Image
        </label>
        <input
          type="file"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
      </div>
      <div className="flex justify-between mt-6">
        <button className="p-2 bg-cyan-700 rounded-md text-cyan-100 ">
          Cancel
        </button>
        <button className="p-2 bg-cyan-700 rounded-md text-cyan-100 ">
          {isUpdating ? "updating" : "update"}
        </button>
      </div>
    </form>
  );
}
