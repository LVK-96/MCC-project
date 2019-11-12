import React, { useEffect, useContext } from 'react';
import AuthenticationContext from '../../contexts/AuthenticationContext';
import MainNavigator from '../../navigators/MainNavigator';

/*A component for everything in the app aside from the authentication view*/
function MainScreen({
  navigation,
}) {
  const authenticationContext = useContext(AuthenticationContext);
  /*If not logged in, navigate to Authentication screen*/
  useEffect(() => {
    if (!authenticationContext && navigation) {
      navigation.navigate("Authentication");
    }
  });
  return (
    <MainNavigator navigation={navigation}/>
  );
}

MainScreen.router = MainNavigator.router;

export default MainScreen;
