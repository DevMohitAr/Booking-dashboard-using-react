import React, { cloneElement } from "react";
import useCloseForm from "../hooks/cabins/useCloseForm";
const ModalContext = React.createContext();
export default function Modal({ children }) {
  const [name, setName] = React.useState("");

  const close = () => setName("");
  const open = setName;
  return (
    <ModalContext.Provider value={{ open, close, name }}>
      {children}
    </ModalContext.Provider>
  );
}

const Open = ({ children, opens }) => {
  const { open } = React.useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opens) });
};

const Window = ({ children, compName }) => {
  const { name, close } = React.useContext(ModalContext);
  const ref = useCloseForm(close);
  // React.useEffect(()=>{
  //   const handleClick = (e) => {
  //     if (ref.current && !ref.current.contains(e.target)) {
  //       close();
  //     }
  //   };
  //   document.addEventListener('click',handleClick,true)

  // return ()=>{
  //   document.removeEventListener('click',handleClick,true)
  // }
  // },[close])

  if (name !== compName) return null;
  return (
    <OverLay>
      <div ref={ref} className="relative z-10 ">
        {cloneElement(children, { onCloseModal: close })}
        <button onClick={close}>
          {<Close className="w-12 h-12 bg-white absolute right-3 -top-20" />}
        </button>
      </div>
    </OverLay>
  );
};

export const OverLay = ({ children }) => {
  return (
    <div className="absolute bg-gray-400 bg-opacity-50  inset-0 flex justify-center items-center backdrop-filter backdrop-blur-md">
      {children}
    </div>
  );
};

function Close(props) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" {...props}>
      <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3l105.4 105.3c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256l105.3-105.4z" />
    </svg>
  );
}
Modal.open = Open;
Modal.window = Window;
