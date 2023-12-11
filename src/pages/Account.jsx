import React from "react";
import useUser from "../hooks/auth/useUser";
import useUpdateUser from "../hooks/auth/useUpdateUser";
import UpdateDataForm from "../components/updateDataForm";
import UpdatePassForm from "../components/UpdatePassForm";

export default function Account() {
  const [newname, setNewname] = React.useState("");
  const [image, setImage] = React.useState("");

  const { data } = useUser();
  const { email } = data;
  const { updateUser,isUpdating } = useUpdateUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!newname) return;
     updateUser({ name :newname,avatar:image},{onSuccess:()=>{
      setImage(null);
      e.target.reset()
     }});
  };
  return (
    <>
      <div className="mt-10 text-3xl text-cyan-700">
        <h1 className="text-center">Change details</h1>
      </div>

      <UpdateDataForm />
      <div className="mt-10 text-3xl text-cyan-700">
        <h1 className="text-center">Change Password</h1>
      </div>
      <UpdatePassForm />
    </>
  );
}

