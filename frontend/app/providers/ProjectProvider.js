import React, { useState } from 'react';
import ProjectContext from '../contexts/ProjectContext';

/*Encapsulates project logic inside one component.*/
function ProjectProvider({ children }) {
  const projects = [
    {
      id: 100,
      name: 'name 1',
      description: 'description 1',
      deadline: '2020-01-01',
      favorite: true,
      created: '2019-06-06',
      modified: '2019-09-09',
      keywords: ['test', 'project', 'placeholder'],
    },
  ];
  return (
    <ProjectContext.Provider value={projects}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
