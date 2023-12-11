import React, { cloneElement } from "react";
import useCloseForm from "../hooks/cabins/useCloseForm";
const MenuContext = React.createContext();
export default function Menu({ children }) {
  const [openId, setOpenId] = React.useState("");
  const [position, setPosition] = React.useState(null);
  const close = () => {
    setOpenId("");
  };
  const open = setOpenId;
  return (
    <MenuContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenuContext.Provider>
  );
}

const Toggle = ({ id }) => {
  const { openId, open, close, setPosition } = React.useContext(MenuContext);
  const handleClick = (e) => {
    const rect = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rect.width - rect.x,
      y: rect.y + rect.height + 8,
    });
    openId === "" || openId !== id ? open(id) : close();
  };

  return (
    <button onClick={handleClick}>
      <VerticalBar />
    </button>
  );
};

const List = ({ id, children }) => {
  const { openId, position, close } = React.useContext(MenuContext);
  const ref = useCloseForm(close);
  if (openId !== id) return null;

  return (
    <ul
      className={`flex flex-col   shadow-md px-2 py-1 absolute -right-[${position.x}px] -top-[${position.y}px] bg-gray-700 text-gray-50 text-[16px] rounded-md`}
      ref={ref}
    >
      {children}
    </ul>
  );
};

const Button = ({ children, icon, onClick }) => {
  const { close } = React.useContext(MenuContext);
  const handleClick = () => {
    onClick?.();
    close();
  };
  return (
    <li>
      <button onClick={handleClick} className="flex gap-2 items-center">
        <span>{icon}</span>
        <span>{children}</span>
      </button>
    </li>
  );
};

Menu.Toggle = Toggle;
Menu.List = List;
Menu.Button = Button;

function VerticalBar(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="1em"
      viewBox="0 0 128 512"
      {...props}
    >
      <path d="M64 360a56 56 0 100 112 56 56 0 100-112zm0-160a56 56 0 100 112 56 56 0 100-112zm56-104A56 56 0 108 96a56 56 0 10112 0z" />
    </svg>
  );
}
