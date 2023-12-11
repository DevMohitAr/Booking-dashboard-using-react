import React from 'react'

export default function useCloseForm(handler) {
    const ref = React.useRef()
     React.useEffect(() => {
       const handleClick = (e) => {
         if (ref.current && !ref.current.contains(e.target)) {
           handler();
         }
       };
       document.addEventListener("click", handleClick, true);

       return () => {
         document.removeEventListener("click", handleClick, true);
       };
     }, [handler]);
  return ref
    
}
