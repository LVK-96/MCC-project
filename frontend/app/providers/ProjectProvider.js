import React, { useState, useEffect, useContext } from 'react';
import ProjectContext from '../contexts/ProjectContext';
import projectsService from '../services/projectService';
import AuthenticationContext from '../contexts/AuthenticationContext';
import fetchCorrectRes from '../util/fetchCorrectRes';
import projectService from '../services/projectService';

const mockprojects = [
  {
    id: 100,
    name: 'name 1',
    description: 'description 1',
    deadline: '2020-01-01',
    favorite: true,
    created: '2019-06-06',
    modified: '2019-09-09',
    keywords: ['test', 'project', 'placeholder', 'different'],
    type: 'GROUP',
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
    type: 'PERSONAL',
  },
  {
    id: 102,
    name: 'name 3',
    description: 'description 3',
    deadline: '2020-01-01',
    favorite: true,
    created: '2019-06-06',
    modified: '2019-11-01',
    keywords: ['test', 'project', 'placeholder', 'different'],
    type: 'GROUP'
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
    type: 'PERSONAL',
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
    type: 'GROUP',
  },
];

/*Encapsulates project logic inside one component.*/
const supportedTypes = ['pdf', 'mp3', 'txt', 'jpg', 'png'];
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

  // Make call to back-end and add the newly created project to local
  // projects context. Returns whether creation was successful.
  // TODO: handle no picture situation better i.e have some default pic
  const createProject = async (project, imageRes) => {
    try {
      const created = await projectsService.createProject(project, imageRes);
      const url = await fetchCorrectRes(created.iconSource);
      setProjects(prevProjects => [{ ...created, iconSource: url }, ...prevProjects]);
      return true;
    } catch (error) {
      console.log('Error', error);
      return false;
    }
  };

  // This assumes that file has fields name and uri.
  // Returns the created files.
  const addFile = async (project, file) => {
    try {
      // Check that file type is supported
      const format = file.path.split('.').reverse()[0];
				if (!supportedTypes.includes(format)) {
					return;
      }
      let created;
      // Create image if it is jpg or png. File otherwise.
      if (format === 'png' || format === 'jpg') {
        created = await projectService.createImage(project.id, file);
      } else {
        created = await projectService.createFile(project.id, file);
      }
      return created;
    } catch (e) {
      throw e;
    }
  };

  // Deletes the project designated by id.
  // Returns whether deletion was successful.
  // TODO: check that this actually works
  const deleteProject = async (id) => {
    const deleted = await projectService.deleteProject(id);
    // If successful, update local state.
    if (deleted !== null) {
      setProjects(prev => prev.filter(project => project.id !== id));
      return true;
    } else {
      return false;
    }
  };

  const addMemberToProject = (member, projectId) => {
    const toUpdate = projects.find(p => p.id === projectId);
    const newMembers = toUpdate.members.concat(member.uid);
    setProjects(projects.map(p => p.id === toUpdate.id ? {...p, members: newMembers } : p));
  };

  const [selectedProject] = allWithId(selectedProjectId);
  const value = {
    projects,
    selectProject,
    selectedProject,
    createProject,
    addFile,
    deleteProject,
    addMemberToProject,
  };
  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
}

export default ProjectProvider;
