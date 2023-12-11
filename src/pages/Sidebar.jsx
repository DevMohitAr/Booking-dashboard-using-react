import { Link } from 'react-router-dom';

export default function Sidebar() {

  return (
    <>
      <div className="bg-slate-800 row-start-1 row-end-[-1] flex flex-col p-3 items-center justify-center">
        
        <aside className="text-slate-100 text-lg">
          <ul className=" space-y-8 capitalize text-2xl">
            <MyLink>Cabins</MyLink>
            <MyLink>Settings</MyLink>
            <MyLink>Dashboard</MyLink>
            <MyLink>bookings</MyLink>
            <MyLink>user</MyLink>
            
          </ul>
        </aside>
      </div>
    </>
  ); 
}

export const MyLink = ({children})=>{
  return <Link className='block' to={`/${children}`}>{children}</Link>;
}