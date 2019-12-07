import React, { useContext } from 'react';
import MembersList from '../MembersList';
import MembersProvider from '../../providers/MembersProvider';
import ProjectContext from '../../contexts/ProjectContext';

const ProjectMembers = () => {
  const { selectedProject } = useContext(ProjectContext);

  return (
    <MembersProvider projectId={selectedProject.id}>
      <MembersList />
    </MembersProvider>
  );
};

export default ProjectMembers;
