import {
  createStackNavigator,
} from 'react-navigation-stack';
import ProjectListNavigator from './ProjectListNavigator';
import ProjectScreenNavigator from './ProjectScreenNavigator';
import ProfileView from '../views/ProfileView/';

/*Navigator for the various project related screens.*/
export default createStackNavigator({
  ProjectList: ProjectListNavigator,
  Project: ProjectScreenNavigator,
}, {
  headerMode: 'none',
});
