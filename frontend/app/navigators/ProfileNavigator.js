import {
  createStackNavigator,
} from 'react-navigation-stack';
import ProfileView from '../views/ProfileView';
import ChangePasswordView from '../views/ChangePasswordView';

/*Navigator for the various project related screens.*/
export default createStackNavigator({
  Profile: ProfileView,
  ChangePassword: ChangePasswordView,
}, {
  headerMode: 'none',
});
