import {
  createBottomTabNavigator,
} from 'react-navigation-tabs';
import ProfileNavigator from './ProfileNavigator';
import ProjectNavigator from './ProjectNavigator';
import fontSizes from '../values/fontSizes';

/*This is a tab-controlled navigator that allows the user to choose
 *Between the profile and projects views */
export default createBottomTabNavigator({
  Profile: ProfileNavigator,
  Projects: ProjectNavigator,
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: fontSizes.large,
    },
    style: {
      padding: 15,
    }
  },
});
