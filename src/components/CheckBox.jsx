import React from 'react'

export default function CheckBox({checked,onChange,disabled=false,children,id}) {
  return (
    <>
      <input
        type="checkbox"
        name="check"
        id="check"
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor="">
        {children}
      </label>
    </>
  );
}
