import React from 'react'

const About = () => {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
    <h1 className='text-3xl font-bold mb-4 text-slate-800'>About</h1>
    <p className='mb-4 text-slate-700'>This is a MERN (MongoDb,Express ,React,Nodejs)stack application with authentication it allows users to sign up 
      login and log out and provides access to protected routes only for authenticated users
    </p>

    <p className='mb-4 text-slate-700'>The front end of the application is built with 
      React and uses ReactRouter for client side routig the back-end is built with Nodejs and express 
      and use MongoseDB as the database authentication is implemented using JSON web Token. 
    </p>

    <p className='mb-4 text-slate-700'>
      This application is inteded as a starting point for building fulll-stack web application with authentication
      using the MERN stack, feek free to use as a templete for your oum project
    </p>

  </div>
  )
}

export default About