import {
  createStackNavigator,
} from 'react-navigation-stack';
import ProfileView from '../views/ProfileView';
import ChangePasswordView from '../views/ChangePasswordView';

export default createStackNavigator({
  Profile: ProfileView,
  ChangePassword: ChangePasswordView,
}, {
  headerMode: 'none',
});
