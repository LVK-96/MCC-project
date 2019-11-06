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
    {
      id: 101,
      name: 'name 2',
      description: 'description 2',
      deadline: (new Date(Date.now() + 6*24*60*60*1000)).toString(),
      favorite: false,
      created: '2019-06-06',
      modified: '2019-09-09',
      keywords: ['test', 'project', 'placeholder'],
    },
    {
      id: 102,
      name: 'name 3',
      description: 'description 3',
      deadline: '2020-01-01',
      favorite: true,
      created: '2019-06-06',
      modified: '2019-11-01',
      keywords: ['test', 'project', 'placeholder'],
    },
    {
      id: 103,
      name: 'name 4',
      description: 'description 4',
      deadline: '2020-01-01',
      favorite: false,
      created: '2019-06-06',
      modified: '2019-10-10',
      keywords: ['test', 'project', 'placeholder'],
    },
    {
      id: 104,
      name: 'name 5',
      description: 'description 5',
      deadline: '2019-01-01',
      favorite: true,
      created: '2018-06-06',
      modified: '2019-09-09',
      keywords: ['test', 'project', 'placeholder'],
    },
  ];
  const value = {
    projects,
  };
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
