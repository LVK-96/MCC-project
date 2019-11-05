import React, { useContext } from 'react';
import { View, Text } from 'react-native';
//import styles from './styles';
import colors from '../../values/colors';
import AuthenticationContext from '../../contexts/AuthenticationContext';

function ProfileView() {
  const authenticationContext = useContext(AuthenticationContext);

  return (
    <View>
      <Text>
        profile
      </Text>
    </View>
  );
}

export default ProfileView;
