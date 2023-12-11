import React from 'react'
import RegisterForm from '../../ui/RegisterForm'

export default function User() {
  return (
    <>
      <div >
        <h1 className='text-center mt-5 text-4xl text-cyan-700 font-semibold'>Create a user</h1>
        <RegisterForm />
      </div>
    </>
  );
}
