
export default function Select({options,value,onChange}) {
  
  return (
    <div>
        <select className="p-3 bg-gray-100 text-blue-700 border rounded-md focus:outline-none focus:ring focus:border-blue-300" value={value}  onChange={onChange}>
            {options.map((option)=>{
                return <option key={option.value} value={option.value}>{option.label}</option>
            })}
        </select>
    </div>
  )
}
