import {
  createStackNavigator,
} from 'react-navigation-stack';
import ProjectListNavigator from './ProjectListNavigator';
import ProjectScreenNavigator from './ProjectScreenNavigator';
import ProfileView from '../views/ProfileView/';
import ProjectForm from '../views/ProjectFormView';

/*Navigator for the various project related screens.*/
export default createStackNavigator({
  ProjectList: ProjectListNavigator,
  Project: ProjectScreenNavigator,
  ProjectForm: ProjectForm,
}, {
  headerMode: 'none',
});