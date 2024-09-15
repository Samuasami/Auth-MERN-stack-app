import React from 'react'

const Home = () => {
  return (
    <div className='px-4 py-12 max-w-2xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>Welcome to my Auth App</h1>
      <p className='mb-4 text-slate-700'>This is a full stack web application built with the MERN 
        (MongoDb,Express,React,Node.js) stack. it includes authentication features that allow users to 
        Sifn Up login and log out and provides access to protected routes only for authenticatiesd users.
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

export default Home