import React, { useContext } from 'react';
import MembersList from '../MembersList';
import MembersProvider from '../../providers/MembersProvider';
import ProjectContext from '../../contexts/ProjectContext';

/*A component for displaying the members of the current project.
  Wraps around MembersList by providing it the members via a MembersProvider.*/
const ProjectMembers = () => {
  const { selectedProject } = useContext(ProjectContext);

  return (
    <MembersProvider projectId={selectedProject.id}>
      <MembersList />
    </MembersProvider>
  );
};

export default ProjectMembers;
