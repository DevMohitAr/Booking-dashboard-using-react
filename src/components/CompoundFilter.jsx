import Filter from './Filter'

export default function CompFilter({filterField,options,filterValue}) {
  return (
    <div>
        <Filter filterField={filterField} options={options} filterValue={filterValue}/>
    </div>
  )
}
