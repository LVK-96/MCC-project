import {
  createStackNavigator,
} from 'react-navigation-stack';
import ProjectListNavigator from './ProjectListNavigator';

/*Navigator for the various project related screens.*/
export default createStackNavigator({
  ProjectList: ProjectListNavigator,
}, {
  headerMode: 'none',
});
