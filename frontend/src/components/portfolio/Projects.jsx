import React from 'react';

import Fullstack from './Fullstack';
import Backend from './Backend'
import Frontend from './Frontend';
function Projects() {

  return (
    <div className="flex flex-col -mt-30">
      <section className='flex w-full'>
        <h3 className='flex items-center justify-center w-full'>
          <span className='grey-divider'></span>
          <span className='mx-8 text-lg font-raleway font-bold uppercase'>
            Projects
          </span> 
          <span className='grey-divider'></span>  
        </h3>
      </section>

      <Frontend />
      <Fullstack />
      <Backend />

    </div>
  );
}

export default Projects;