// import React from 'react'
//  const Context = React.createContext();
// export const Counter = ({children}) => {
   
//     const [count,setCount] = React.useState(0)
//     const handleIncrease = ()=>setCount(count+1)
//     const handleDecrease = ()=>setCount(count - 1)
//   return (
//     <Context.Provider value={{count,handleDecrease,handleIncrease}}>
//         {children}
//     </Context.Provider>
//   )
// }

// export const Label =({children})=>{
//     return <p>{children}</p>
// }
// export const Count = ()=>{
//     const {count} = React.useContext(Context)
//     return <p>{count}</p>
// }

// export const PlusBtn = ()=>{
//     const {handleIncrease}=React.useContext(Context)
//     return <button onClick={handleIncrease}>+</button>
// }
// export const MinusBtn = () => {
//   const { handleDecrease } = React.useContext(Context);
//   return <button onClick={handleDecrease}>-</button>;
// };

// Counter.label = Label
// Counter.plus = PlusBtn
// Counter.minus = MinusBtn
// Counter.count = Count


// import { Counter } from "../components/Counter";

// export default function Dashboard() {
//   return (
//     <div>
//       <Counter>
//         <Counter.label>Count</Counter.label>
//         <Counter.plus />
//         <Counter.count />
//         <Counter.minus />
//       </Counter>
//     </div>
//   );
// }