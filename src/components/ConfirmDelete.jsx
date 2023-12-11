import React from 'react'

export default function ConfirmDelete({resourceName,onConfirm,disabled,onCloseModal}) {
    const handleClick = ()=>{
        onConfirm()
        onCloseModal()
    }
  return (
    <div className="bg-white px-8 py-4 rounded-lg space-y-4 max-w-lg">
      <h1 className='text-center text-red-500'>Delete {resourceName}</h1>
      <p className='text-gray-700'>
        Are you sure you want to delete this {resourceName} permanently? this
        action cant be undone
      </p>
      <div className='flex justify-between px-10'>
        <button disabled={disabled} onClick={onCloseModal} className='p-2 bg-slate-600 text-slate-50 rounded-sm '>
          Cancel
        </button>
        <button disabled={disabled} onClick={handleClick} className='p-2 bg-red-800 text-white'>
          Delete
        </button>
      </div>
    </div>
  );
}
