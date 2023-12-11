import { Link } from "react-router-dom";
import useLogOut from "../hooks/auth/useLogOut";
import useUser from "../hooks/auth/useUser";
import Avatar from "../components/Avatar";
export default function Header() {
  const { logOut, isLoggingOut } = useLogOut();

  const { data } = useUser();
  const { user_metadata } = data;
  const { name, phoneNumber, twitter,avatar } = user_metadata;
  console.log("datahea", data);
  const handleClick = () => {
    logOut();
  };
  return (
    <div className="bg-slate-500 p-8 text-slate-50 text-2xl flex justify-between items-center  ">
      <div className="flex items-center gap-4">
        <Avatar src={avatar || "src/assets/default-user.jpg"} />
        <p>{name}</p>
      </div>
      <div className="flex gap-4">
        <Link to="account" className="block">settings</Link>

        <button onClick={handleClick} className="block">
          logout
        </button>
      </div>
    </div>
  );
}
