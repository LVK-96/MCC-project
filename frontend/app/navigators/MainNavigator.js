import {
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import ProfileView from '../views/ProfileView';
import ProjectNavigator from './ProjectNavigator';


/*This is a tab-controlled navigator that allows the user to choose
 *Between the profile and projects views */
export default createBottomTabNavigator({
  Profile: ProfileView,
  Projects: ProjectNavigator,
});
