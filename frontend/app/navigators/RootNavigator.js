import {
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';
import AuthenticationView from '../views/AuthenticationView';
import MainScreen from '../views/MainScreen';

const RootNavigator = createSwitchNavigator(
  {
    Authentication: AuthenticationView,
    Main: MainScreen,
  },
  {
    headerMode: 'none',
  },
);

export default createAppContainer(RootNavigator);
