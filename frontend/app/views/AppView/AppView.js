import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import AuthenticationView from '../AuthenticationView';
import ProfileView from '../ProfileView';
import AuthenticationProvider from '../../providers/AuthenticationProvider';
import ProjectProvider from '../../providers/ProjectProvider';
import ProjectList from '../ProjectList';
import RootNavigator from '../../navigators/RootNavigator';

/*A component that hosts everything application specific in the application
 (i.e. no framework-related setup code, but essentially everything else).*/
const MainNavigator = createStackNavigator({
  Authentication: {screen: AuthenticationView},
  Profile: {screen: ProfileView},
});

const MainContainer = createAppContainer(MainNavigator);

function AppView(props) {
  return (
    <AuthenticationProvider>
      <ProjectProvider>
        <RootNavigator/>
      </ProjectProvider>
    </AuthenticationProvider>
  );
}

// Routes must be the same to make the navigation work inside a provider
AppView.router = MainContainer.router;

export default AppView;
