import React from 'react';
import AuthenticationView from '../AuthenticationView';
import AuthenticationProvider from '../../providers/AuthenticationProvider';
import ProjectProvider from '../../providers/ProjectProvider';
import ProjectList from '../ProjectList';
import RootNavigator from '../../navigators/RootNavigator';

/*A component that hosts everything application specific in the application
 (i.e. no framework-related setup code, but essentially everything else).*/
function AppView() {
  return (
    <AuthenticationProvider>
      <ProjectProvider>
        <RootNavigator/>
      </ProjectProvider>
    </AuthenticationProvider>
  );
}

export default AppView;
