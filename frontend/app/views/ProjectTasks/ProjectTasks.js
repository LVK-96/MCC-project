import React, { useContext } from 'react';
import ProjectContext from '../../contexts/ProjectContext';
import TasksProvider from '../../providers/TasksProvider';
import TasksNavigator from '../../navigators/TasksNavigator';

function ProjectTasks({ navigation }) {
  const { selectedProject } = useContext(ProjectContext);

  return (
    <TasksProvider projectId={selectedProject.id}>
      <TasksNavigator navigation={navigation}/>
    </TasksProvider>
  );
}

ProjectTasks.router = TasksNavigator.router;

export default ProjectTasks;
