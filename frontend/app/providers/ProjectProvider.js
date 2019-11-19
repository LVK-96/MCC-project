import React, { useState, useEffect, useContext } from 'react';
import ProjectContext from '../contexts/ProjectContext';
import projectsService from '../services/projects';
import AuthenticationContext from '../contexts/AuthenticationContext';

const mockprojects = [
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

/*Encapsulates project logic inside one component.*/
function ProjectProvider({ children }) {
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projects, setProjects] = useState([]);
  const authContext = useContext(AuthenticationContext);

  useEffect(() => {
    if (authContext.isLoggedIn){
      const getProjects = async () => {
        const fetchedProjects = await projectsService.getAll();
        if (fetchedProjects) {
          setProjects(fetchedProjects);
        } else { // Set mock data if connection fails, TODO: remove this before deployment
          setProjects(mockprojects);
        }
      };
      getProjects();
    }
  }, [authContext.isLoggedIn]);

  const allWithId = id => projects.filter(project => project.id === id);
  const selectProject = async (projectId) => {
    if (allWithId(projectId).length > 0) {
      setSelectedProjectId(projectId);
      return true;
    } else {
      return false;
    }
  };

  const [selectedProject] = allWithId(selectedProjectId);
  const value = {
    projects,
    selectProject,
    selectedProject,
  };
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
